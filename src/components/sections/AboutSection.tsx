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
      className="relative flex h-screen w-screen flex-shrink-0 overflow-hidden bg-white"
    >
      <GrainTexture opacity={0.5} blendMode="multiply" />

      {/* Header — InfiniteScroll (mobile) or VerticalMarquee (desktop) */}
      {isMobile ? (
        <div className="absolute top-0 w-full">
          <InfiniteScroll
            text="ABOUT  "
            baseVelocity={2}
            direction="left"
            textClassName="text-5xl font-bold tracking-[0.5em] px-4"
            textColor="pink"
            textVariant="mixed"
            strokeColor="pink"
            solidColor="white"
            containerStyle={{
              backgroundColor: 'transparent',
              height: '60px',
            }}
          />
        </div>
      ) : (
        <VerticalMarquee text="ABOUT ME" speed={4} darkMode={false} />
      )}

      {/* Main content area */}
      <div
        className={`relative z-10 flex w-full ${
          isMobile ? 'mt-18 flex-col items-center px-6' : 'flex-row'
        }`}
      >
        {/* Optional divider (desktop only) */}
        {!isMobile && <div className="h-full border-l-4 border-zinc-200"></div>}

        {/* Lanyard (goes first on mobile, last on desktop) */}
        <div
          className={`flex items-center justify-center pb-20 ${
            isMobile
              ? 'order-1 w-full -translate-x-[2rem] scale-140 pt-8' // add scale here
              : 'order-2 w-1/2'
          }`}
        >
          <Lanyard />
        </div>

        {/* About Me Text */}
        <div
          className={`flex flex-col ${
            isMobile
              ? 'order-2 w-full justify-center text-center'
              : 'order-1 mt-16 ml-10 w-3/4 justify-start px-10 text-left'
          }`}
        >
          <div className="max-w-3xl space-y-12">
            <div className="space-y-12">
              <div className="flex flex-wrap items-baseline justify-center gap-4 md:justify-start">
                <h1
                  className="text-4xl font-semibold whitespace-nowrap md:text-5xl"
                  style={{
                    WebkitTextStroke: '3px black',
                    paintOrder: 'stroke fill',
                  }}
                >
                  Based in
                </h1>
                <h1
                  className="text-4xl font-semibold whitespace-nowrap text-white md:text-5xl"
                  style={{
                    WebkitTextStroke: '3px black',
                    paintOrder: 'stroke fill',
                  }}
                >
                  Navotas, Metro Manila
                </h1>
              </div>

              <h2 className="text-2xl leading-tight font-light text-zinc-900 md:text-6xl">
                Creating visually captivating UI and immersive digital experiences
              </h2>
            </div>
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
