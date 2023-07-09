/**
 * @file src/components/Magnetik/MagnetikButton.tsx
 * @description MagnetikButton component. Custom Button that works the same way as the MagnetikContainer but
 * the text inside the button is also affected by the magnetic field.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS
import {CSSProperties, ForwardedRef, forwardRef, ReactElement, useLayoutEffect, useRef} from "react";

import styled from 'styled-components';
import {gsap} from "gsap";
import MyButton from "../MyButton";
// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLE
// Styled components
const StyledMagnetikContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Types
type T_MagnetikButtonProps = {
  text: string
  style: CSSProperties,

  fieldSize?: number,
  fieldForce?: number,
  centered?: boolean,
}
// END VARIABLES ======================================================================================= END VARIABLES

// COMPONENENT  ============================================================================================= COMPONENT
/**
 * Magnetik component
 * @return
 * @constructor
 **/
const MagnetikButton = forwardRef(function MagnetikButton(
  props: T_MagnetikButtonProps,
  passedRef: ForwardedRef<HTMLElement>
): ReactElement {
  // State(s)

  // Ref(s)
  // DOM ref(s)
  const mainContainerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement>(null);
  // Other ref(s)

  // Variable(s)
  const fieldSize = props.fieldSize ?? 2;
  const fieldForce = props.fieldForce ?? .5;

  // Method(s)
  const handleMagnetikContainerMouseMove = (e: MouseEvent) => {
    if (!mainContainerRef.current) return;


    const {clientX, clientY} = e;
    const mainContainerRect = mainContainerRef.current.getBoundingClientRect();
    // @ts-ignore
    // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
    const passedRect = passedRef.current.getBoundingClientRect();

    const mainContainerInfos = {
      top: mainContainerRect.top,
      left: mainContainerRect.left,
      width: mainContainerRect.width,
      height: mainContainerRect.height,
    }

    const passedInfos = {
      top: passedRect.top,
      left: passedRect.left,
      width: passedRect.width,
      height: passedRect.height,
    }

    const centerX = mainContainerInfos.left + mainContainerInfos.width / 2;
    const centerY = mainContainerInfos.top + mainContainerInfos.height / 2;

    const sideRatioX = Math.floor((clientX - centerX) / (mainContainerInfos.width / 2) * 100) / 100;
    const sideRatioY = Math.floor((clientY - centerY) / (mainContainerInfos.height / 2) * 100) / 100;

    const translateX = props.centered ?
      mainContainerInfos.width / 2 * sideRatioX * fieldForce :
      (passedInfos.width - mainContainerInfos.width) / -2 * sideRatioX * fieldForce;

    const translateY = props.centered ?
      mainContainerInfos.height / 2 * sideRatioY * fieldForce :
      (passedInfos.height - mainContainerInfos.height) / -2 * sideRatioY * fieldForce;

    const buttonAnimTl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: 'power2.out',
      }
    });

    buttonAnimTl
      // @ts-ignore
      // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
      .to(passedRef.current, {
        x: translateX,
        y: translateY,
      })
      .to(textRef.current, {
        x: translateX * .25,
        y: translateY * .25,
      }, '<');
  }

  const handleMagnetikContainerMouseLeave = () => {
    if (!mainContainerRef.current) return;

    const buttonAnimTl = gsap.timeline({
      defaults: {
        duration: 0.3,
        ease: 'power2.out',
      }
    });

    buttonAnimTl
      // @ts-ignore
      // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
      .to(passedRef.current, {
        x: 0,
        y: 0,
      })
      .to(textRef.current, {
        x: 0,
        y: 0,
        ease: 'power3.out',
      }, '<');
  }
  // Effect(s)
  useLayoutEffect(() => {
    if (!mainContainerRef.current) return;

    // Get the child container size
    // @ts-ignore
    // (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
    const {width, height} = passedRef.current.getBoundingClientRect();

    // Apply the field size
    gsap.set(mainContainerRef.current, {
      width: width * fieldSize,
      height: height * fieldSize,
      border: '4px solid red',
    });
  })

  // Render
  return (
    // @ts-ignore
    <StyledMagnetikContainer
      ref={mainContainerRef}

      onMouseMove={handleMagnetikContainerMouseMove}
      onMouseLeave={handleMagnetikContainerMouseLeave}
    >
      <MyButton
        ref={passedRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...props.style,
        }
        }
      >
        <span ref={textRef}>{props.text}</span>
      </MyButton>
    </StyledMagnetikContainer>
  )
});
// END COMPONENT =======================================================================================  END COMPONENT

export default MagnetikButton;

/**
 * End of file src/components/src/components/Magnetik/Magnetik.tsx
 */