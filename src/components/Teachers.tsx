"use client";

import { useEffect, useRef, useState } from "react";

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

type BioBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "certifications"; items: string[] };

type Teacher = {
  name: string;
  role: string;
  image: string;
  position: string;
  zoom: number;
  tagline?: string;
  bio?: BioBlock[];
};

const TEACHERS: Teacher[] = [
  {
    name: "Stine",
    role: "Founder · Flow, Power, Sculpt & Yin",
    image: "/Stine%20profilbilde.jpg?v=1",
    position: "70% 34%",
    zoom: 1.9,
    tagline: "Meet Stine",
    bio: [
      {
        type: "quote",
        text: "I am not here to just take you through the movements. I am here to give you the space to discover something along the way - and to be there with you while you do.",
      },
      {
        type: "paragraph",
        text: "I have been teaching yoga for seventeen years, fifteen of them full-time, and I still show up to every class with the same feeling I had at the beginning - that what happens in this room matters, and so do the people in it.",
      },
      { type: "heading", text: "How I got here" },
      {
        type: "paragraph",
        text: "My own story with movement didn't start gracefully. I came to yoga as a complete beginner with no sports background and a body I didn't fully trust. What I found on the mat changed that slowly, quietly, and then profoundly - not just physically, but in the way I understood myself. That experience never left me, and it shapes everything I teach.",
      },
      { type: "heading", text: "A few chapters along the way" },
      {
        type: "paragraph",
        text: "I founded Joy Yoga Oslo in 2015, built one of Norway's first online yoga platforms, and co-founded Yoga for BJJ - an online platform bringing yoga, mobility and recovery work to Brazilian jiu-jitsu athletes around the world. I have led teacher trainings for over eight years, with a particular focus on athletes and on people who never thought movement was for them.",
      },
      { type: "heading", text: "Still a student" },
      {
        type: "paragraph",
        text: "I have many certifications, and they matter to me. But what I believe has shaped me most as a teacher is something simpler:",
      },
      {
        type: "quote",
        text: "I have never stopped taking other people's classes.",
      },
      {
        type: "paragraph",
        text: "I still show up as a student, and I always will. There is something you can only learn from the other side of the room, and with so many extraordinary teachers in the world, I never want to stop being reminded of that.",
      },
      { type: "heading", text: "How I teach" },
      {
        type: "paragraph",
        text: "My teaching style is worth knowing about before you come. I am not the teacher who picks apart every detail or tells you exactly how your body should look in every moment. I believe people are layered and complex, and that the most valuable thing I can offer in a group setting is intelligent guidance alongside genuine space - space for you to feel what is actually happening in your own body and to start listening to it.",
      },
      {
        type: "paragraph",
        text: "If you are looking for strict, prescriptive instruction, I am probably not your teacher, and that is completely fine. But if you want to be guided, supported and given room to learn something about yourself along the way, I think you will feel right at home here.",
      },
      {
        type: "certifications",
        items: [
          "500h Vinyasa · Tiffany Cruikshank",
          "AcroYoga",
          "Rocket Yoga",
          "Yin",
          "Restorative",
          "Yoga Nidra",
          "Pre & postnatal",
          "Oxygen Advantage breathwork",
          "Barre",
        ],
      },
      { type: "heading", text: "Heat Lagos" },
      {
        type: "paragraph",
        text: "Heat Lagos is the next chapter, and I couldn't be more excited to share it with you. Built around the belief that the right space and the right guidance can genuinely shift something in a person. I am here to give you the space to discover something along the way, and to be there with you while you do.",
      },
    ],
  },
  {
    name: "Sebastian",
    role: "Pilates, Power, Mobility & Recovery",
    image: "/Sebastian%20profilbilde.jpg?v=1",
    position: "center 25%",
    zoom: 1,
    tagline: "Meet Sebastian",
    bio: [
      {
        type: "quote",
        text: "If the idea of a yoga or Pilates class has ever made you quietly nervous, Sebastian is probably exactly the teacher you have been waiting for.",
      },
      {
        type: "paragraph",
        text: "Sebastian has been teaching yoga for nearly fifteen years, and in that time he has become one of the most recognised voices in the world when it comes to yoga, mobility and recovery for martial artists. As co-founder of Yoga for BJJ, the first platform of its kind, he has introduced yoga to hundreds of thousands of grapplers around the world who never thought it was for them, and changed the way an entire community trains, recovers and takes care of their bodies.",
      },
      { type: "heading", text: "From judo mat to yoga mat" },
      {
        type: "paragraph",
        text: "His own story started not on a yoga mat but on the judo mat, where he began training at the age of seven. He went on to become a two-time world champion and four-time European champion in Brazilian jiu-jitsu, competing at the highest levels for years. It was injuries that brought him to yoga, and yoga that gave him his career back.",
      },
      {
        type: "quote",
        text: "He knows firsthand what it feels like to be a serious athlete who wants nothing to do with a yoga class, and that is exactly what makes him so good at teaching one.",
      },
      { type: "heading", text: "How he teaches" },
      {
        type: "paragraph",
        text: "That belief lives in the way he teaches. At Heat, Sebastian teaches yoga and Pilates, and he brings a rare combination of deep knowledge and genuine humour to every class. He is the kind of teacher who makes the room feel lighter, who takes the practice seriously without taking himself too seriously, and who has a particular gift for making movement feel completely undaunting to people who have spent their whole lives avoiding it.",
      },
    ],
  },
  {
    name: "Anastasiia",
    role: "Sculpt & Mobility",
    image: "/Anastasiia%20profilbilde.jpg?v=1",
    position: "center 28%",
    zoom: 1,
    tagline: "Meet Anastasiia",
    bio: [
      {
        type: "quote",
        text: "Movement is not only about the body - but about connection, confidence, and self-expression.",
      },
      {
        type: "paragraph",
        text: "Hello, I'm Anastasiia. Movement has been part of my life for as long as I can remember. Since childhood, I've been fascinated by the strength, beauty, and potential of the human body - a curiosity that led me to the gym as a teenager and shaped the path I follow today.",
      },
      { type: "heading", text: "A lifetime with movement" },
      {
        type: "paragraph",
        text: "Over the years, I've explored different styles of training across countries and cultures, discovering that movement is not only about the body, but about connection, confidence, and self-expression.",
      },
      { type: "heading", text: "Training" },
      {
        type: "paragraph",
        text: "I'm a certified personal trainer, group fitness instructor, and stretching coach. Through years of practice, I've developed a deep understanding of the body and gathered the tools to transform not only physical strength, but the way we feel within ourselves.",
      },
      { type: "heading", text: "Finding my calling" },
      {
        type: "paragraph",
        text: "After more than a decade as a student, I found my true calling to guide others in becoming stronger, more confident, and more connected to their bodies. For the past 3 years, I've been teaching strength and flexibility training in Lagos, and nothing inspires me more than seeing people grow, transform, and rediscover themselves.",
      },
      { type: "heading", text: "In my classes" },
      {
        type: "paragraph",
        text: "My classes are designed to improve strength, flexibility, posture, and body awareness - in a supportive and empowering atmosphere where every level is welcome.",
      },
      {
        type: "quote",
        text: "This is your space to feel stronger, softer, and more in tune with your body. I can't wait to move with you.",
      },
    ],
  },
  {
    name: "Agata",
    role: "Power",
    image: "/Agata%20profilbilde.jpg?v=1",
    position: "center 30%",
    zoom: 1,
    tagline: "Meet Agata",
    bio: [
      {
        type: "quote",
        text: "A dynamic practice that bridges the gap between passive flexibility and active strength.",
      },
      {
        type: "paragraph",
        text: "Hi, my name is Agata. I'm originally from Poland but spent half my life in Ireland, and I'm now enjoying the Portuguese sun.",
      },
      { type: "heading", text: "My training" },
      {
        type: "paragraph",
        text: "My yoga journey started around 2013/2014, and I'm a certified Hatha and Vinyasa teacher with over 800 hours of training.",
      },
      { type: "heading", text: "In my classes" },
      {
        type: "paragraph",
        text: "I love to mix Vinyasa flow with Mobility Yoga, creating a dynamic practice that bridges the gap between passive flexibility and active strength. I focus on continuous breath-synchronised movement between postures, with an emphasis on functional range of motion.",
      },
      {
        type: "paragraph",
        text: "Welcome to my class at Heat.",
      },
    ],
  },
  {
    name: "Nadine",
    role: "Bikram Yoga",
    image: "/Nadine%20profilbilde.jpg?v=1",
    position: "center 30%",
    zoom: 1,
    tagline: "Meet Nadine",
    bio: [
      {
        type: "quote",
        text: "On a mission to guide others on their journey of self-transformation and discovery.",
      },
      {
        type: "paragraph",
        text: "Nadine is a world-travelling yoga teacher with over 19 years of experience. She has visited more than 50 countries and lived in 7 of them, teaching and learning along the way.",
      },
      { type: "heading", text: "How she got here" },
      {
        type: "paragraph",
        text: "After experiencing burnout and depression herself, Nadine found healing through the practice of yoga and mindfulness. That way of living transformed her life, and now she is passionate about helping others do the same.",
      },
      {
        type: "paragraph",
        text: "Through yoga, meditation, breathwork and coaching, she supports people from all walks of life in reconnecting with their joy and purpose, helping them find clarity and make choices that truly fulfill them.",
      },
      { type: "heading", text: "Her path" },
      {
        type: "paragraph",
        text: "Despite a background in business administration, Nadine found her true calling in sharing the healing power of yoga. She hopes her story inspires others to design a life filled with purpose, joy and happiness.",
      },
    ],
  },
];

const BANNER_IMAGE = "/ring%20detail.jpeg?v=1";

const BIO_TEACHERS = TEACHERS.filter((t) => t.bio);

export default function Teachers() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? BIO_TEACHERS[activeIndex] : null;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((i) =>
      i === null ? null : (i + 1) % BIO_TEACHERS.length,
    );
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + BIO_TEACHERS.length) % BIO_TEACHERS.length,
    );

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="teachers" className="relative py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-20">
        <div className="mb-12 flex flex-col items-start gap-4 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            Heat Teachers
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-5xl lg:text-7xl">
            Our teachers,
            <br />
            <em className="text-brand">your guides.</em>
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            Every class is led by certified instructors who live and breathe
            this practice. Expect careful cueing, honest challenge, and room to
            be exactly where you are.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-5 pb-4 sm:gap-6 sm:px-6 lg:px-20">
          {TEACHERS.map((t) => (
            <button
              type="button"
              key={t.name}
              onClick={() => {
                if (!t.bio) return;
                const idx = BIO_TEACHERS.findIndex((x) => x.name === t.name);
                if (idx !== -1) setActiveIndex(idx);
              }}
              disabled={!t.bio}
              className="group flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-stone-dark/60 text-left ring-1 ring-white/5 transition-transform w-[78%] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] enabled:hover:-translate-y-1 enabled:cursor-pointer disabled:cursor-default"
              aria-label={t.bio ? `Read ${t.name}'s bio` : t.name}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: t.position,
                    transform: `scale(${t.zoom})`,
                    transformOrigin: t.position,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                  <span className="font-serif text-3xl text-foreground drop-shadow">
                    {t.name}
                  </span>
                  {t.bio && (
                    <span
                      aria-hidden
                      className="text-xl leading-none text-foreground/80 drop-shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                    >
                      →
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-stone">
                  {t.role}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent lg:w-24"
          aria-hidden
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-6 sm:pt-12 lg:px-20">
        <div className="overflow-hidden rounded-3xl">
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img
              src={BANNER_IMAGE}
              alt="Heat Lagos in studio"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-dark/80 via-stone-dark/20 to-stone-dark/80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-4xl italic text-foreground drop-shadow-lg lg:text-6xl">
                In class, together.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!active}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute inset-0 h-full w-full cursor-default bg-stone-dark/70 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active ? `${active.name} bio` : undefined}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={`absolute bottom-0 left-0 right-0 mx-auto flex h-[90vh] flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-stone-dark shadow-2xl transition-transform duration-300 ease-out sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-[min(820px,90vh)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border ${
            active
              ? "translate-y-0"
              : "translate-y-full sm:translate-y-[calc(-50%+40px)]"
          }`}
        >
          <div className="mx-auto mb-2 mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" />
          <div className="flex shrink-0 items-center justify-between gap-3 px-6 pb-2 pt-4 sm:pt-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
              {active?.tagline ?? "Bio"}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous teacher"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span aria-hidden>←</span>
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next teacher"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span aria-hidden>→</span>
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
              </button>
            </div>
          </div>
          <div className="overflow-y-auto px-6 pb-10 sm:px-8">
            {active && (
              <>
                <div className="mb-6 flex items-center gap-4 sm:mb-8">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 sm:h-24 sm:w-24">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="h-full w-full object-cover"
                      style={{
                        objectPosition: active.position,
                        transform: `scale(${active.zoom})`,
                        transformOrigin: active.position,
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-3xl leading-none sm:text-4xl">
                      {active.name}
                    </h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone">
                      {active.role}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-foreground/80">
                  {active.bio?.map((block, i) => {
                    if (block.type === "heading") {
                      return (
                        <h4
                          key={i}
                          className="mt-8 mb-3 font-serif text-xl leading-snug text-foreground first:mt-0 sm:text-2xl"
                        >
                          {block.text}
                        </h4>
                      );
                    }
                    if (block.type === "quote") {
                      if (i === 0) {
                        return (
                          <blockquote
                            key={i}
                            className="relative mb-6 pl-12 font-serif text-2xl italic leading-snug text-brand-soft sm:text-3xl sm:pl-16"
                          >
                            <span
                              aria-hidden
                              className="absolute -top-4 left-0 font-serif text-[5rem] leading-none text-brand sm:-top-6 sm:text-[7rem]"
                            >
                              &ldquo;
                            </span>
                            {block.text}
                          </blockquote>
                        );
                      }
                      return (
                        <blockquote
                          key={i}
                          className="my-4 border-l-2 border-brand pl-4 font-serif text-lg italic leading-snug text-brand-soft sm:text-xl"
                        >
                          {block.text}
                        </blockquote>
                      );
                    }
                    if (block.type === "certifications") {
                      return (
                        <div key={i} className="my-6">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-brand">
                            Certifications
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {block.items.map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] leading-snug text-foreground/80"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <p key={i} className="mb-4 leading-relaxed last:mb-0">
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
