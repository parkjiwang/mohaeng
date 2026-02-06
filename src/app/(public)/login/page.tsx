import KoreaMap from "@/components/KoreaMap";
import Background from "@/components/Background";
import TopNavAuto from "@/components/TopNavAuto";
import TitleBlock from "@/components/TitleBlock";

export default function LoggedOutHome() {
  return (
    <main className="relative min-h-[100svh]">
      <Background position="50% 100%" />
      <TopNavAuto />

      <section className="pt-24 pb-8">
        <div className="w-full px-6">
          <TitleBlock
            title="- 모두의 모든 행사 -"
            desc="원하는 지역 클릭 시 그 지역의 행사 게시판으로 이동합니다."
            logoWidth={140}
            logoHeight={56}
          />

          <div className="w-full min-h-[calc(100svh-240px)] pb-24">
            <KoreaMap requireLogin />
          </div>
        </div>
      </section>
    </main>
    
  );
}