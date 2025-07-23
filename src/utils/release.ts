interface ReleaseInfo {
  BUILDTIME: string;
  VERSION: string;
  REVISION: string;
}

export const fetchReleaseInfo = async (): Promise<ReleaseInfo | null> => {
  try {
    const response = await fetch('/release.json');
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.warn('Could not fetch release info:', error);
    return null;
  }
};

export const formatRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    if (months < 12) return `${months}mo ago`;
    return `${years}y ago`;
  } catch {
    return 'unknown';
  }
};

export const formatVersion = (version: string): string => {
  // Clean up version string
  if (version === 'local') return 'dev';
  if (version.startsWith('refs/heads/')) return version.replace('refs/heads/', '');
  if (version.startsWith('feat/') || version.startsWith('fix/') || version.startsWith('chore/')) {
    return version.split('/')[1] || version;
  }
  return version;
};

export const formatRevision = (revision: string): string => {
  if (revision === 'unknown' || revision === 'dev-test') return '';
  return revision.substring(0, 7);
};