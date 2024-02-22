import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface TransitionProps {
  pathname: string | null;
  children: ReactJSXElement;
}

const RouteTransition = ({ pathname, children }: TransitionProps) => {
  return (
    <TransitionGroup className={`transition-wrapper`}>
      <CSSTransition key={pathname} classNames="right" timeout={500}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default RouteTransition;