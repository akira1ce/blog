import './index.css';

export interface MarqueeProps {
  children: React.ReactNode;
  duration?: number;
}

const Marquee = (props: MarqueeProps) => {
  const { children, duration = 2 } = props;

  return (
    <div className="marquee-wrapper">
      <div className="wrapper-item" style={{ animationDuration: `${duration}s` }}>
        {children}
      </div>
    </div>
  );
};

export default Marquee;
