/**
 * Utility functions for handling user verification status
 */

export const setVerificationStatus = (status: 'verified' | 'unverified') => {
  // Store in localStorage
  localStorage.setItem('userVerificationStatus', status);

  // Dispatch custom event to notify components immediately
  window.dispatchEvent(new CustomEvent('verificationStatusChanged', { detail: status }));
};

export const getVerificationStatus = (): 'verified' | 'unverified' | null => {
  const status = localStorage.getItem('userVerificationStatus');
  return status as 'verified' | 'unverified' | null;
};

export const isVerified = (): boolean => {
  return getVerificationStatus() === 'verified';
};

// Test function for development
export const toggleVerificationStatus = () => {
  const currentStatus = getVerificationStatus();
  const newStatus = currentStatus === 'verified' ? 'unverified' : 'verified';
  setVerificationStatus(newStatus);
  // Status change logged silently
};
