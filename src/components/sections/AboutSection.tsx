import GrainTexture from '../GrainTexture';
import Lanyard from '../reactbits/Lanyard/Lanyard';
import VerticalMarquee from '../VerticalMarquee';
import InfiniteScroll from '../InfiniteScroll';
import useIsMobile from '../../hook/useIsMobile';

const AboutSection = () => {
  const isMobile = useIsMobile();

  return (
    <section
      id="about"
      className={`relative w-screen flex-shrink-0 overflow-hidden bg-white ${
        isMobile ? 'flex h-auto min-h-screen flex-col' : 'flex h-screen'
      }`}
    >
      <GrainTexture opacity={0.5} blendMode="multiply" />

      {/* Header — InfiniteScroll (mobile) or VerticalMarquee (desktop) */}
      {isMobile ? (
        <div className="absolute top-0 w-full">
          <InfiniteScroll
            text="ABOUT  "
            baseVelocity={2}
            direction="left"
            textClassName="text-4xl font-bold tracking-[0.5em] px-4"
            textColor="pink"
            textVariant="mixed"
            strokeColor="pink"
            solidColor="white"
            containerStyle={{
              backgroundColor: 'transparent',
              height: '50px',
            }}
          />
        </div>
      ) : (
        <VerticalMarquee text="ABOUT ME" speed={4} darkMode={false} />
      )}

      {/* Main content area */}
      <div
        className={`relative z-10 flex w-full ${
          isMobile
            ? 'mt-[70px] flex-col items-center justify-start space-y-8 px-6 pb-24'
            : 'flex-row'
        }`}
      >
        {/* Divider (desktop only) */}
        {!isMobile && <div className="h-full border-l-4 border-zinc-200"></div>}

        {/* Lanyard */}
        <div
          className={`flex items-center justify-center ${
            isMobile
              ? 'order-1 mb-4 w-full -translate-x-6 scale-[1.35] py-4'
              : 'order-2 w-1/2 pb-20'
          }`}
        >
          <Lanyard />
        </div>

        {/* About Me Text */}
        <div
          className={`flex flex-col ${
            isMobile
              ? 'order-2 w-full space-y-6 text-center'
              : 'order-1 mt-16 ml-10 w-3/4 justify-start px-10 text-left'
          }`}
        >
          <div className="max-w-3xl space-y-8">
            {/* Location text */}
            <div className="flex flex-wrap items-baseline justify-center gap-2 md:justify-start">
              <h1
                className="text-3xl font-semibold whitespace-nowrap md:text-5xl"
                style={{
                  WebkitTextStroke: '2px black',
                  paintOrder: 'stroke fill',
                }}
              >
                Based in
              </h1>
              <h1
                className="text-3xl font-semibold whitespace-nowrap text-white md:text-5xl"
                style={{
                  WebkitTextStroke: '2px black',
                  paintOrder: 'stroke fill',
                }}
              >
                Navotas, Metro Manila
              </h1>
            </div>

            {/* Subtitle */}
            <h2 className="text-xl leading-snug font-light text-zinc-900 md:text-6xl">
              Creating visually captivating UI and immersive digital experiences
            </h2>

            {/* Paragraph (only on desktop) */}
            <p className="hidden text-base leading-relaxed text-zinc-600 md:block md:text-lg">
              Blending the art of design with the precision of coding, I create digital experiences
              that are visually stunning and functionally robust. I'm passionate about turning ideas
              into interactive, human-centered products.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
