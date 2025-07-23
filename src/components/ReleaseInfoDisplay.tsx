import { useState, useEffect } from 'react';
import { fetchReleaseInfo, formatRelativeTime, formatVersion, formatRevision } from '@/utils/release';

const ReleaseInfoDisplay = () => {
  const [releaseInfo, setReleaseInfo] = useState<{
    version: string;
    time: string;
    revision: string;
  } | null>(null);

  useEffect(() => {
    const loadReleaseInfo = async () => {
      const info = await fetchReleaseInfo();
      if (info) {
        setReleaseInfo({
          version: formatVersion(info.VERSION),
          time: formatRelativeTime(info.BUILDTIME),
          revision: formatRevision(info.REVISION)
        });
      }
    };

    loadReleaseInfo();

    // Update time every minute to keep it current
    const interval = setInterval(async () => {
      const info = await fetchReleaseInfo();
      if (info) {
        setReleaseInfo(prev => ({
          ...prev!,
          time: formatRelativeTime(info.BUILDTIME)
        }));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!releaseInfo) return null;

  return (
    <div className="text-xs text-muted-foreground/70 flex items-center gap-1">
      <span>v{releaseInfo.version}</span>
      {releaseInfo.revision && (
        <>
          <span>•</span>
          <span>{releaseInfo.revision}</span>
        </>
      )}
      <span>•</span>
      <span>{releaseInfo.time}</span>
    </div>
  );
};

export default ReleaseInfoDisplay;
