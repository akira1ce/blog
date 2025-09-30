import Marquee from './components/marquee';

const MarqueeText = ({ text }: any) => {
  return <Marquee duration={3 + text.length / 2}>{text}</Marquee>;
};

const Index = () => {
  return (
    <>
      <MarqueeText text={' Assad sad sad撒啊撒大大啊撒大大'} />
      <MarqueeText text={'盛大开业！！！！！盛大开业！！！！！盛大开业！！！！！'} />
      <MarqueeText text={'asdsdssadsdasdsdaasdsdsadsadad'} />
    </>
  );
};

export default Index;
