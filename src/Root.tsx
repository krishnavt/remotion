import {Composition} from 'remotion';
import {JavaGcVideo} from './java-gc-video/JavaGcVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="java-gc-video"
        component={JavaGcVideo}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={3600}
        defaultProps={{}}
      />
    </>
  );
};
