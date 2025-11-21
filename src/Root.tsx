import { Composition } from 'remotion';
import { ScalingBasics } from './ScalingBasics';
import { SystemDesignHook } from './SystemDesignHook';
import { SystemDesignFundamentals } from './SystemDesignFundamentals';
import { Introduction } from './Introduction';
import { VerticalScaling } from './VerticalScaling';
import { VerticalScalingFixed } from './VerticalScalingFixed';
import { HorizontalScaling } from './HorizontalScaling';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ScalingBasics"
        component={ScalingBasics}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SystemDesignHook"
        component={SystemDesignHook}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Introduction"
        component={Introduction}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VerticalScaling"
        component={VerticalScaling}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VerticalScalingFixed"
        component={VerticalScalingFixed}
        durationInFrames={750} // 25 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HorizontalScaling"
        component={HorizontalScaling}
        durationInFrames={1500} // 50 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SystemDesignFundamentals"
        component={SystemDesignFundamentals}
        durationInFrames={23400} // 13 minutes at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};