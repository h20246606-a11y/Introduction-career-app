/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Palette, 
  FileText, 
  Smartphone, 
  PenTool, 
  Monitor, 
  Layers,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// --- Types ---

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
  tools: string[];
  outlook: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

// --- Data ---

const CAREER_PATHS: CareerPath[] = [
  {
    id: "ui-ux",
    title: "UI/UX 디자인",
    description: "사용자 인터페이스(UI)와 사용자 경험(UX)을 설계합니다. 제품의 사용성과 시각적 즐거움을 동시에 고려하는 분야입니다.",
    icon: <Smartphone className="w-6 h-6" />,
    skills: ["사용자 리서치", "와이어프레임", "프로토타이핑", "인터랙션 디자인"],
    tools: ["Figma", "Adobe XD", "Sketch", "Protopie"],
    outlook: "IT 산업의 성장과 함께 가장 수요가 높은 분야 중 하나입니다."
  },
  {
    id: "graphic",
    title: "그래픽 디자인",
    description: "시각적 메시지를 전달하기 위해 이미지, 텍스트, 색상을 조합합니다. 포스터, 로고, 출판물 등 광범위한 영역을 다룹니다.",
    icon: <Palette className="w-6 h-6" />,
    skills: ["타이포그래피", "레이아웃", "색채학", "일러스트레이션"],
    tools: ["Photoshop", "Illustrator", "InDesign"],
    outlook: "전통적인 매체부터 디지털 매체까지 꾸준한 수요가 있습니다."
  },
  {
    id: "product",
    title: "제품 디자인",
    description: "물리적인 제품의 형태와 기능을 설계합니다. 가구, 가전제품, 자동차 등 우리 주변의 모든 사물을 다룹니다.",
    icon: <Layers className="w-6 h-6" />,
    skills: ["3D 모델링", "재료학", "인간공학", "렌더링"],
    tools: ["Rhino", "Keyshot", "SolidWorks", "Fusion 360"],
    outlook: "제조업의 고도화와 함께 디자인 가치가 더욱 중요해지고 있습니다."
  },
  {
    id: "motion",
    title: "모션 그래픽",
    description: "그래픽 요소에 움직임을 더해 메시지를 전달합니다. 영상 광고, 방송 타이틀, UI 애니메이션 등에 활용됩니다.",
    icon: <Monitor className="w-6 h-6" />,
    skills: ["스토리보드", "애니메이션 원리", "영상 편집", "사운드 디자인"],
    tools: ["After Effects", "Cinema 4D", "Premiere Pro"],
    outlook: "영상 콘텐츠 소비 증가로 인해 전문 인력에 대한 수요가 급증하고 있습니다."
  },
  {
    id: "brand",
    title: "브랜드 디자인",
    description: "기업이나 제품의 정체성을 시각적으로 구축합니다. 로고부터 브랜드 가이드라인까지 통합적인 이미지를 관리합니다.",
    icon: <PenTool className="w-6 h-6" />,
    skills: ["브랜드 전략", "로고 디자인", "비주얼 아이덴티티", "패키지 디자인"],
    tools: ["Illustrator", "Photoshop", "Figma"],
    outlook: "브랜딩의 중요성이 커지면서 기업들의 투자가 지속되고 있습니다."
  }
];

const CERTIFICATIONS: Certification[] = [
  {
    id: "gtq",
    name: "GTQ (그래픽기술자격)",
    issuer: "한국생산성본부",
    description: "포토샵 등 디자인 소프트웨어 활용 능력을 평가하는 국가공인 자격증입니다.",
    difficulty: "Easy"
  },
  {
    id: "cg-specialist",
    name: "컴퓨터그래픽스운용기능사",
    issuer: "한국산업인력공단",
    description: "디자인 원고를 컴퓨터를 활용하여 시각적으로 표현하는 능력을 평가합니다.",
    difficulty: "Medium"
  },
  {
    id: "colorist",
    name: "컬러리스트 산업기사/기사",
    issuer: "한국산업인력공단",
    description: "색채에 관한 이론 지식과 실무 능력을 평가하는 전문 자격증입니다.",
    difficulty: "Hard"
  },
  {
    id: "acp",
    name: "Adobe Certified Professional",
    issuer: "Adobe",
    description: "어도비 소프트웨어 활용 능력을 증명하는 국제 인증 자격증입니다.",
    difficulty: "Medium"
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Palette className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">DesignCareer</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#career" className="text-sm font-medium hover:text-primary transition-colors">진로 소개</a>
            <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">포트폴리오</a>
            <a href="#resume" className="text-sm font-medium hover:text-primary transition-colors">자기소개서</a>
            <a href="#cert" className="text-sm font-medium hover:text-primary transition-colors">자격증</a>
            <Button size="sm">상담 신청</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col gap-4"
          >
            <a href="#career" onClick={() => setIsOpen(false)} className="text-sm font-medium">진로 소개</a>
            <a href="#portfolio" onClick={() => setIsOpen(false)} className="text-sm font-medium">포트폴리오</a>
            <a href="#resume" onClick={() => setIsOpen(false)} className="text-sm font-medium">자기소개서</a>
            <a href="#cert" onClick={() => setIsOpen(false)} className="text-sm font-medium">자격증</a>
            <Button className="w-full">상담 신청</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm rounded-full">
            디자이너를 위한 커리어 가이드
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            당신의 디자인 <br />
            <span className="text-primary">커리어를 설계하세요</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            진로 탐색부터 포트폴리오 완성, 취업 성공까지. <br />
            디자인 전공자를 위한 모든 정보를 한곳에 담았습니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full">
              가이드 시작하기
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
              포트폴리오 템플릿
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CareerSection = () => {
  return (
    <section id="career" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">디자인 진로 소개</h2>
            <p className="text-muted-foreground">나에게 맞는 디자인 분야를 찾아보세요.</p>
          </div>
          <Button variant="link" className="group">
            전체 보기 <ArrowUpRight className="ml-1 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_PATHS.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow border-none bg-background">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {path.icon}
                  </div>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">핵심 역량</span>
                      <div className="flex flex-wrap gap-2">
                        {path.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">주요 도구</span>
                      <div className="flex flex-wrap gap-2">
                        {path.tools.map(tool => (
                          <Badge key={tool} variant="outline" className="font-normal">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-sm text-muted-foreground italic">"{path.outlook}"</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">합격을 부르는 <br /><span className="text-primary">포트폴리오 전략</span></h2>
            <p className="text-lg text-muted-foreground mb-8">
              단순히 결과물만 나열하는 것이 아니라, 당신의 문제 해결 과정과 논리적인 사고를 보여주어야 합니다.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "문제 정의", desc: "사용자가 겪고 있는 진짜 문제가 무엇인지 명확히 정의합니다." },
                { title: "리서치 & 분석", desc: "데이터와 사용자 인터뷰를 통해 가설을 검증합니다." },
                { title: "솔루션 도출", desc: "분석 결과를 바탕으로 최적의 디자인 대안을 제시합니다." },
                { title: "임팩트 측정", desc: "디자인이 비즈니스나 사용자에게 어떤 변화를 주었는지 수치로 보여줍니다." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="mt-10 group">
              포트폴리오 가이드북 다운로드 <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-muted rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img 
                src="https://picsum.photos/seed/design-portfolio/800/800" 
                alt="Portfolio Preview" 
                className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 text-white">
                <p className="text-sm font-medium mb-2 uppercase tracking-widest opacity-80">Featured Template</p>
                <h3 className="text-2xl font-bold">Modern Minimalist UX Portfolio</h3>
              </div>
            </div>
            {/* Floating elements for visual interest */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ResumeSection = () => {
  return (
    <section id="resume" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">자기소개서 & 이력서 팁</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            디자이너의 이력서는 그 자체로 하나의 디자인 결과물입니다. <br />
            가독성과 전문성을 동시에 잡는 팁을 확인하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <FileText className="w-10 h-10 mb-4 text-white" />
              <CardTitle>핵심 키워드 활용</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                직무와 관련된 핵심 역량 키워드를 상단에 배치하세요. 채용 담당자가 6초 안에 당신의 전문성을 파악할 수 있어야 합니다.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <CheckCircle2 className="w-10 h-10 mb-4 text-white" />
              <CardTitle>수치화된 성과</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                "디자인을 잘했습니다" 대신 "사용자 만족도를 20% 향상시켰습니다"와 같이 구체적인 수치를 사용하여 신뢰도를 높이세요.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardHeader>
              <Layers className="w-10 h-10 mb-4 text-white" />
              <CardTitle>가독성 높은 레이아웃</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                적절한 여백과 타이포그래피 위계를 사용하여 정보를 구조화하세요. 디자이너로서의 레이아웃 감각을 보여줄 기회입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const CertificationSection = () => {
  return (
    <section id="cert" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold mb-6">추천 자격증</h2>
            <p className="text-muted-foreground mb-8">
              자격증은 당신의 성실함과 기초 지식을 증명하는 좋은 수단입니다. 직무에 필요한 자격증을 전략적으로 취득하세요.
            </p>
            <div className="p-6 bg-background rounded-2xl border border-border">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> 학습 리소스
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer">
                  <ChevronRight className="w-4 h-4" /> 자격증 기출문제 모음
                </li>
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer">
                  <ChevronRight className="w-4 h-4" /> 어도비 툴 마스터 클래스
                </li>
                <li className="flex items-center gap-2 hover:text-primary cursor-pointer">
                  <ChevronRight className="w-4 h-4" /> 디자인 이론 요약집
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <AccordionItem key={cert.id} value={cert.id} className="bg-background border rounded-xl px-6">
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="text-left">
                        <span className="text-xs font-medium text-muted-foreground block mb-1">{cert.issuer}</span>
                        <span className="text-lg font-bold">{cert.name}</span>
                      </div>
                      <Badge 
                        variant={cert.difficulty === "Easy" ? "secondary" : cert.difficulty === "Medium" ? "outline" : "destructive"}
                        className="ml-4"
                      >
                        {cert.difficulty}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    <p className="mb-4">{cert.description}</p>
                    <Button variant="outline" size="sm">상세 정보 보기</Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Palette className="text-primary-foreground w-4 h-4" />
            </div>
            <span className="font-bold text-lg tracking-tight">DesignCareer</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">이용약관</a>
            <a href="#" className="hover:text-primary">개인정보처리방침</a>
            <a href="#" className="hover:text-primary">문의하기</a>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2026 DesignCareer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <main>
        <Hero />
        <CareerSection />
        <PortfolioSection />
        <ResumeSection />
        <CertificationSection />
        
        {/* CTA Section */}
        <section className="py-24 px-4 text-center">
          <div className="max-w-3xl mx-auto p-12 bg-muted rounded-[3rem] border border-border relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">나만의 커리어 로드맵을 <br />만들어보세요</h2>
              <p className="text-muted-foreground mb-8">
                지금 가입하고 현직 디자이너들의 멘토링과 <br />
                최신 채용 정보를 받아보세요.
              </p>
              <Button size="lg" className="rounded-full px-10">지금 시작하기</Button>
            </div>
            {/* Decorative background element */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
