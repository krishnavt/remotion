import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
  spring,
} from 'remotion';

const SalaryComparison: React.FC<{ progress: number }> = ({ progress }) => {
  const juniorSalary = interpolate(progress, [0, 1], [0, 60000]);
  const seniorSalary = interpolate(progress, [0, 1], [0, 140000]);
  
  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '10%',
      display: 'flex',
      gap: '60px',
      opacity: progress,
    }}>
      {/* Junior Developer */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '20px',
        color: 'white',
        textAlign: 'center',
        width: '280px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}>
        <h3 style={{
          fontSize: '24px',
          margin: '0 0 15px 0',
          fontWeight: '600',
        }}>Junior Developer</h3>
        <div style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#FFD700',
        }}>
          ${Math.round(juniorSalary).toLocaleString()}
        </div>
      </div>
      
      {/* Senior Engineer */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '30px',
        borderRadius: '20px',
        color: 'white',
        textAlign: 'center',
        width: '280px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      }}>
        <h3 style={{
          fontSize: '24px',
          margin: '0 0 15px 0',
          fontWeight: '600',
        }}>Senior Engineer</h3>
        <div style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#FFD700',
        }}>
          ${Math.round(seniorSalary).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

const CompanyLogos: React.FC<{ visible: boolean }> = ({ visible }) => {
  const companies = [
    { name: 'Google', color: '#4285F4', icon: 'G' },
    { name: 'Meta', color: '#1877F2', icon: 'f' },
    { name: 'Amazon', color: '#FF9900', icon: 'a' },
    { name: 'Netflix', color: '#E50914', icon: 'N' },
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: '15%',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '40px',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.8s ease-in-out',
    }}>
      {companies.map((company, index) => (
        <div
          key={company.name}
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: company.color,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            transform: visible ? 'scale(1)' : 'scale(0)',
            transition: `transform 0.6s ease-out ${index * 0.1}s`,
          }}
        >
          {company.icon}
        </div>
      ))}
    </div>
  );
};

const DreamJobAnimation: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '60%',
      right: '8%',
      opacity: progress,
      transform: `scale(${progress})`,
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        padding: '25px 35px',
        borderRadius: '25px',
        color: 'white',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        border: '3px solid rgba(255,255,255,0.2)',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>💼</div>
        <div>$100K+ Salary Jump</div>
      </div>
    </div>
  );
};

const CodingSkillsIcon: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '30%',
      right: '15%',
      opacity: visible ? 1 : 0,
      transform: visible ? 'rotate(0deg)' : 'rotate(-180deg)',
      transition: 'all 0.8s ease-out',
    }}>
      <div style={{
        width: '160px',
        height: '160px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        border: '4px solid rgba(255,255,255,0.2)',
      }}>
        💻
      </div>
    </div>
  );
};

const SystemDesignIcon: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div style={{
      position: 'absolute',
      top: '45%',
      right: '35%',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1)' : 'scale(0)',
      transition: 'all 0.6s ease-out 0.3s',
    }}>
      <div style={{
        width: '140px',
        height: '140px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '56px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        border: '4px solid rgba(255,255,255,0.2)',
      }}>
        🏗️
      </div>
    </div>
  );
};

export const SystemDesignHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15 seconds = 450 frames at 30fps
  const salaryProgress = interpolate(frame, [30, 120], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3)
  });
  
  const dreamJobProgress = interpolate(frame, [150, 210], [0, 1], { 
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3)
  });
  
  const codingSkillsVisible = frame > 240;
  const systemDesignVisible = frame > 270;
  const companyLogosVisible = frame > 330;

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      position: 'relative',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      }} />


      {/* Salary comparison animation */}
      <SalaryComparison progress={salaryProgress} />

      {/* Dream job animation */}
      <DreamJobAnimation progress={dreamJobProgress} />

      {/* Skills icons */}
      <CodingSkillsIcon visible={codingSkillsVisible} />
      <SystemDesignIcon visible={systemDesignVisible} />

      {/* Company logos */}
      <CompanyLogos visible={companyLogosVisible} />

      {/* Bottom text overlay */}
      <Sequence from={360} durationInFrames={90}>
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
          maxWidth: '90%',
        }}>
          <p style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            lineHeight: '1.4',
          }}>
            Master the concepts behind the world's biggest applications
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};