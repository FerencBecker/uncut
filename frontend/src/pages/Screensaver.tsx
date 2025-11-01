import ScreensaverComponent from '@/components/Screensaver/Screensaver';
import type { Studio } from '@/types/map';
import './Screensaver.css';

type ScreensaverProps = {
  studios: Studio[];
  onBegin: () => void;
};

const Screensaver = ({ studios, onBegin }: ScreensaverProps) => {
  return (
    <div
      className="screensaver-page"
      data-theme="dark"
      onClick={onBegin}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onBegin()}
    >
      <ScreensaverComponent studios={studios} kioskMode={true} />
    </div>
  );
};

export default Screensaver;
