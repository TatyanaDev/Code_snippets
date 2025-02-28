import { ElementType, ComponentPropsWithoutRef, ReactNode, CSSProperties } from "react";
import "./styles.css";

type StarBorderProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: ReactNode;
  color?: string;
  speed?: CSSProperties["animationDuration"];
};

const StarBorder = <T extends ElementType = "button">({ as, className = "", color = "white", speed = "6s", children, ...rest }: StarBorderProps<T>) => {
  const Component = as || "button";

  return (
    <Component className={`star-border-container ${className}`} {...rest}>
      <div
        className="border-gradient-bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="border-gradient-top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
