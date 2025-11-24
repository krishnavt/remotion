import { Composition } from 'remotion';
import { BrandIntro } from './components/BrandIntro';
import { Scene1_HookIntro } from './Scene1_HookIntro';
import { Scene2_BigPicture } from './Scene2_BigPicture';
import { Scene3_CAPTheorem } from './Scene3_CAPTheorem';
import { Scene4_ScalePerformance } from './Scene4_ScalePerformance';
import { Scene5_ArchitectureLayers } from './Scene5_ArchitectureLayers';
import { Scene6_DatabaseStrategies } from './Scene6_DatabaseStrategies';
import { Scene7_CachingStrategies } from './Scene7_CachingStrategies';
import { Scene8_MessageQueues } from './Scene8_MessageQueues';
import { Scene9_PuttingItTogether } from './Scene9_PuttingItTogether';
import { Scene10_Outro } from './Scene10_Outro';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="00-BrandIntro"
        component={BrandIntro}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene1-HookIntro"
        component={Scene1_HookIntro}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene2-BigPicture"
        component={Scene2_BigPicture}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene3-CAPTheorem"
        component={Scene3_CAPTheorem}
        durationInFrames={2700} // 90 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene4-ScalePerformance"
        component={Scene4_ScalePerformance}
        durationInFrames={2700} // 90 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene5-ArchitectureLayers"
        component={Scene5_ArchitectureLayers}
        durationInFrames={3600} // 120 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene6-DatabaseStrategies"
        component={Scene6_DatabaseStrategies}
        durationInFrames={3600} // 120 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene7-CachingStrategies"
        component={Scene7_CachingStrategies}
        durationInFrames={2700} // 90 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene8-MessageQueues"
        component={Scene8_MessageQueues}
        durationInFrames={2700} // 90 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene9-PuttingItTogether"
        component={Scene9_PuttingItTogether}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
      <Composition
        id="Scene10-Outro"
        component={Scene10_Outro}
        durationInFrames={900} // 30 seconds at 30fps
        fps={30}
        width={3840}
        height={2160}
      />
    </>
  );
};