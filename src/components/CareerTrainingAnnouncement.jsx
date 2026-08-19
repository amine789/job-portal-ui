import { useEffect, useState } from 'react';

const STORAGE_KEY = 'careerTrainingAnnouncementSeenAt';
const REAPPEAR_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const CareerTrainingAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    const shouldShow = !lastSeen || Date.now() - Number(lastSeen) > REAPPEAR_AFTER_MS;
    if (shouldShow) setIsOpen(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close announcement"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6">
          <span className="text-3xl text-primary-600 dark:text-primary-400">🎓</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
          New Career Training Programs!
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Boost your job search with our free training sessions on resume building,
          interview skills, and technical skills development.
        </p>

        {/* Buttons */}
        <button
          onClick={handleClose}
          className="w-full px-6 py-3 text-white rounded-xl font-semibold transition-colors bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default CareerTrainingAnnouncement;
