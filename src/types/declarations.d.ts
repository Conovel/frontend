// declarations.d.ts
declare module 'react-material-ui-carousel' {
  import * as React from 'react';

  export interface CarouselProps {
    className?: string;
    sx?: any;
    next?: boolean;
    prev?: boolean;
    autoPlay?: boolean;
    navButtonsAlwaysVisible?: boolean;
    NavButton?: (props: {
      onClick: React.MouseEventHandler<HTMLButtonElement>;
      style: React.CSSProperties;
      next: boolean;
      prev: boolean;
    }) => React.ReactNode;
    [key: string]: any;
  }

  const Carousel: React.FC<CarouselProps>;
  export default Carousel;
}
