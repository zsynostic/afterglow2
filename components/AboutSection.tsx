"use client"

import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { RedactedText } from "@/components/RedactedText"

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-20 bg-background relative z-10" data-testid="section-about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="hud-container inline-block px-8 py-4 mb-6">
            <h2
              className={`text-4xl sm:text-5xl font-bold font-mono text-primary glow-text ${
                isVisible ? "animate-fadeInUp" : "opacity-0"
              }`}
              data-testid="text-about-title"
            >
              [GIỚI_THIỆU_ĐỀ_TÀI]
            </h2>
          </div>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto font-mono ${
              isVisible ? "animate-fadeInUp stagger-1" : "opacity-0"
            }`}
          >
            // HIỆN_TƯỢNG_THIẾU_HIỂU_BIẾT_VÀ_CÁC_GIẢI_PHÁP_KHẢ_THI
          </p>
        </div>

        <div
          className={`hud-container-alt p-6 mb-12 max-w-4xl mx-auto ${isVisible ? "animate-fadeInUp stagger-2" : "opacity-0"}`}
        >
          <p className="font-mono text-sm text-muted-foreground leading-relaxed">
            <span className="text-primary">// CLASSIFIED_BRIEFING:</span> Dự án nghiên cứu về các vấn đề xã hội nhạy cảm
            bao gồm <RedactedText>buôn người</RedactedText>, lừa đảo tại <RedactedText>Campuchia</RedactedText>, và các{" "}
            <RedactedText>bẫy</RedactedText> tuyển dụng lao động bất hợp pháp. Nghiên cứu nhằm nâng cao nhận thức về{" "}
            <RedactedText>sự thiếu hiểu biết</RedactedText> và tìm kiếm giải pháp <RedactedText>thay đổi</RedactedText>{" "}
            tình trạng này trong xã hội.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Team Photo Frame */}
          <div className={`w-full max-w-4xl ${isVisible ? "animate-fadeInUp stagger-3" : "opacity-0"}`}>
            <div className="hud-container p-4">
              <div className="border border-primary/30 relative">
                <div className="aspect-[16/9] bg-muted/20 flex items-center justify-center relative overflow-hidden">
                  {/* Placeholder for team photo */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground font-mono">
                    <div className="w-20 h-20 border-2 border-dashed border-primary/40 flex items-center justify-center mb-4">
                      <span className="text-3xl text-primary/60">◈</span>
                    </div>
                    <p className="text-sm">[TEAM_PHOTO_PLACEHOLDER]</p>
                    <p className="text-xs mt-2 text-muted-foreground/60">Thêm ảnh nhóm tại đây</p>
                  </div>
                </div>
                <div className="absolute top-2 left-2 font-mono text-xs text-primary/60">[IMG_REF: TEAM_001]</div>
                <div className="absolute bottom-2 right-2 font-mono text-xs text-muted-foreground/60">
                  ◇ AFTERGLOW_31
                </div>
              </div>
            </div>
          </div>

          {/* Content Box */}
          <div className={`w-full max-w-4xl ${isVisible ? "animate-fadeInUp stagger-4" : "opacity-0"}`}>
            <div
              className="p-6 font-mono text-sm"
              style={{
                backgroundColor: "#0d0d0d",
                borderLeft: "3px solid #4a0000",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <span style={{ color: "#8b0000" }} className="font-bold">
                  [CODENAME: AFTERGLOW]
                </span>
              </div>

              <div className="space-y-4">
                {/* Quote line */}
                <p style={{ color: "#999999" }}>
                  <span style={{ color: "#8b0000" }}>"</span>
                  <span style={{ color: "#8b0000" }} className="font-semibold">
                    Afterglow
                  </span>
                  <span> - Là ánh sáng còn sót lại sau khi mặt trời đã lặn, hoặc sau một vụ nổ lớn.</span>
                  <span style={{ color: "#8b0000" }}>"</span>
                </p>

                {/* Paragraph 1 */}
                <p style={{ color: "#999999" }} className="leading-relaxed">
                  Trước thực trạng nhức nhối của nạn lừa đảo{" "}
                  <span style={{ color: "#8b0000" }}>"việc nhẹ lương cao"</span> và buôn bán người sang{" "}
                  <span style={{ color: "#8b0000" }}>Campuchia</span>, chúng tôi chọn cái tên này như một niềm hy vọng
                  giữa những gam màu tối.
                </p>

                {/* Paragraph 2 */}
                <p style={{ color: "#999999" }} className="leading-relaxed">
                  <span style={{ color: "#8b0000" }}>Sự thiếu hiểu biết</span> và những cái bẫy tâm lý tinh vi đã đẩy vô
                  số nạn nhân vào bi kịch. Nhóm được thành lập để đi sâu vào vấn đề, không né tránh sự thật, nhằm tìm
                  kiếm{" "}
                  <span style={{ color: "#8b0000" }} className="italic">
                    giải pháp nâng cao nhận thức
                  </span>{" "}
                  và ngăn chặn những nỗi đau không đáng có.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
