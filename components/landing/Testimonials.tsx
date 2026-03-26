'use client';

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations('landing.testimonials');
  const tLanding = useTranslations('landing');

  const testimonialsList = t.raw('stories') as { text: string; image: string; name: string; role: string }[];
  const firstColumn = testimonialsList.slice(0, 3);
  const secondColumn = testimonialsList.slice(3, 6);
  const thirdColumn = testimonialsList.slice(6, 9);

  return (
    <section className="bg-background py-32 relative overflow-hidden" id="testimonials">
      <div className="max-w-6xl z-10 mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t('badge')}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#111827] tracking-tight">
            {tLanding('testimonialsTitle')}
          </h2>
          <p className="text-gray-500 text-lg">
            {tLanding('testimonialsSubtitle')}
          </p>
        </motion.div>

        {/* Dynamic scrolling columns */}
        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
