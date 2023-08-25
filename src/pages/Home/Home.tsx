/**
 * @file src/components/Home/Home.tsx
 * @description Home component.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {createContext, RefObject, useEffect, useRef, useState} from "react";

import {gsap} from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

import styled, {useTheme} from 'styled-components'

import Header from "../../components/Header/Header";
import MyUglyFace from "../../components/MyUglyFace/MyUglyFace";
import IsPlayingDisplay from "../../components/IsPlayingDisplay/IsPlayingDisplay";

import {commonTheme, I_Theme, noUserSelection} from "../../App";
import TechStack, {T_TechStackChild} from "../../components/TechStack/TechStack";
import TwoOptionsSelector, {T_returnChoice} from "../../components/TwoOptionsSelector/TwoOptionsSelector";
import ArrowLink from "../../components/ArrowLink";
import MyButton from "../../components/MyButton";

// END IMPORTS ==========================================================================================   END IMPORTS

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

// VARIABLES ================================================================================================ VARIABLES
// Styles
const StyledHome = styled.div(props => ({
  minHeight: props.theme.firstPageHeight,
  width: "100%",
  // overflow: "hidden",

  'background': props.theme.background,

  'color': props.theme.color,

  fontFamily: "Migra, sans-serif !important",
  fontWeight: 700,

  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'justifyContent': 'center',
  gap: props.theme.sidePadding,

  'h2': {
    fontSize: '6rem',
  },

  'h3': {
    fontSize: '4rem',
  },

  ...noUserSelection,
}));

const StyledHomeLanding = styled.div(props => ({
  height: `${commonTheme.firstPageHeight}`,
  width: '100%',

  display: 'flex',
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',
}));

const StyledHomeHalf = styled.div(props => ({
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  fontFamily: "Mondwest, sans-serif !important",

  padding: '3rem',

  'h2, h3': {
    textAlign: 'left',
  }
}));


const StyledSection = styled.section(props => ({
  height: props.theme.firstPageHeight,
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',

  paddingTop: props.theme.minTopPadding,

  fontFamily: "Fraktion Mono, sans-serif",
}));

// Types
type T_homeContext = {
  isPlayingLoadingAnimation: boolean,
}

type T_choiceRef = RefObject<{
  choice: number,
  returnChoice: T_returnChoice
}>

// Context
export const HomeContext = createContext<T_homeContext>({
  isPlayingLoadingAnimation: true,
} as T_homeContext);

// Other
export enum E_Subtitles {
  FrontEnd = 'Front-end',
  FrontEndBackground = '#415a77',
  FrontEndColor = '#ffffff',

  BackEnd = 'Back-end',
  BackEndBackground = '#a3c4bc',
  BackEndColor = '#222222',

  GeneralCoding = 'General Coding',
  GeneralCodingBackground = '#778da9',
  GeneralCodingColor = '#eee',

  DataAnalysis = 'Data Analysis',
  DataAnalysisBackground = '#1b263b',
  DataAnalysisColor = '#eee',
}


const TechStackChildren = [
  {
    title: 'React',
    subtitles: [E_Subtitles.FrontEnd],
    description: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
    image: '/imgs/react-pic.jpg',
  } as T_TechStackChild,
  {
    title: 'TypeScript',
    subtitles: [E_Subtitles.FrontEnd, E_Subtitles.BackEnd, E_Subtitles.GeneralCoding],
    description: 'TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.',
    image: '/imgs/typescript-pic.png',
  } as T_TechStackChild,
  {
    title: 'JavaScript (ES6+)',
    subtitles: [E_Subtitles.FrontEnd, E_Subtitles.BackEnd, E_Subtitles.GeneralCoding],
    description: 'JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.',
    image: '/imgs/javascript-pic.jpg',
  } as T_TechStackChild,
  {
    title: "Python",
    subtitles: [E_Subtitles.GeneralCoding, E_Subtitles.DataAnalysis],
    description: 'Python is an interpreted, high-level and general-purpose programming language.',
    image: '/imgs/python-pic.jpg',
  } as T_TechStackChild,
  {
    title: "Shell",
    subtitles: [E_Subtitles.GeneralCoding],
    description: 'A shell is a user interface for access to an operating system\'s services.',
    image: '/imgs/shell-pic.jpeg',
  }
];

const twoOptions = ["About Me", "Projects"]
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Home component
 * @return {JSX.Element}
 * @constructor
 **/
const Home = () => {
  // Context(s)
  const theme: I_Theme = useTheme() as I_Theme;

  // State(s)
  const [
    isPlayingLoadingAnimation,
    setIsPlayingLoadingAnimation
  ] = useState<boolean>(true);
  const [twoOptionsChoice, setTwoOptionsChoice] = useState<number>(0);

  // Ref(s)
  const headerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const homeLandingRef = useRef<HTMLDivElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const myUglyFaceRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLSelectElement>(null);

  // Method(s)
  const handleChoice = () => {
    console.log(`handleChoice()`);
  }

  // Effect(s)
  useEffect(() => {
    // Loading animation
    const loadingAnimation = gsap.timeline({
      onStart: () => {
        setIsPlayingLoadingAnimation(true);
      }
    });

    loadingAnimation
      .set(leftHalfRef.current, {
        opacity: 0,
        width: '0%',
      })
      .set(rightHalfRef.current, {
        width: '100%',
      })
      .set(headerRef.current, {
        opacity: 0,
        y: '-100%',
      })
      .set(myUglyFaceRef.current, {
        opacity: 0,
        scale: 0,
      })
      .set(firstSectionRef.current, {
        opacity: 0,
        height: 0,
        display: 'none',
        paddingTop: 0,
      })
      .to(myUglyFaceRef.current, {
        opacity: 1,
        scale: 1,
        duration: .5,
        ease: 'power2.out',
      })
      .to(leftHalfRef.current, {
        width: '55%',
        duration: .75,
        ease: 'power3.out',
      })
      .to(rightHalfRef.current, {
        width: '45%',
        duration: .5,
        ease: 'power.out',
      }, '<')
      .to(leftHalfRef.current, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          setIsPlayingLoadingAnimation(false);
        }
      })
      .to(headerRef.current, {
        opacity: 1,
        y: '0%',
        duration: 1,
        ease: 'power2.out',
      }, '<')
      .to(firstSectionRef.current, {
        opacity: 1,
        height: commonTheme.firstPageHeight,
        display: 'flex',
      })

    const scrollTriggerTl = gsap.timeline({
      scrollTrigger: {
        trigger: homeRef.current,
        start: `${window.innerHeight * .5}px`,
        end: `${window.innerHeight * .9}px`,
        scrub: true,
      }
    });

    scrollTriggerTl
      .fromTo(firstSectionRef.current, {
        paddingTop: 0,
      }, {
        paddingTop: commonTheme.minTopPadding,
      })
  }, []);

  useEffect(() => {
    console.log(`[Home] twoOptionsChoice: ${twoOptionsChoice}`);
  }, [twoOptionsChoice]);

  // Render
  return (
    <StyledHome
      ref={homeRef}
    >
      {!isPlayingLoadingAnimation && <IsPlayingDisplay songIfNotPlaying={false}/>}

      <Header key="header" ref={headerRef}/>

      <StyledHomeLanding
        ref={homeLandingRef}
      >
        <StyledHomeHalf
          style={{
            alignItems: 'flex-start',
          }}
          ref={leftHalfRef}
        >
          <h2>Tom Planche</h2>
          <h3>Full Stack Developer</h3>
        </StyledHomeHalf>
        <StyledHomeHalf
          style={{
            width: '40%',
          }}
          ref={rightHalfRef}
        >
          <HomeContext.Provider value={{
            isPlayingLoadingAnimation: isPlayingLoadingAnimation,
          }}>
            <MyUglyFace ref={myUglyFaceRef}/>
          </HomeContext.Provider>
        </StyledHomeHalf>
      </StyledHomeLanding>

      <StyledSection
        ref={firstSectionRef}
      >
        <TwoOptionsSelector
          options={twoOptions}
          stateAndSetter={[twoOptionsChoice, setTwoOptionsChoice]}
        />

        <h2
          style={{
            marginBottom: '2rem',
          }}
        >
          {twoOptionsChoice === 0 ? "Tech Stack" : "Projects"}
        </h2>

        {
          !isPlayingLoadingAnimation && (
            twoOptionsChoice === 0 ?
              <>
                <TechStack childrenObj={TechStackChildren}/>
                <ArrowLink title={"My CV"} href={'/files/CV_FIN_2023.pdf'} style={{
                  marginTop: '2rem',
                  gap: '1rem',
                }}/>
              </>
              :
              <>
                <p>
                  <MyButton href={'/my-music-player'}>
                    Little component
                  </MyButton> for displaying what I&apos;m listening live.
                </p>
              </>
          )
        }

      </StyledSection>

      {/*{*/}
      {/*  !isPlayingLoadingAnimation && <Footer/>*/}
      {/*}*/}
    </StyledHome>
  )
}
// END COMPONENT =======================================================================================  END COMPONENT

export default Home;

/**
 * End of file src/components/Home/Home.tsx
 */