import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, X } from 'lucide-react';

const STORAGE_KEY = 'careerTrainingAnnouncementSeenAt';
const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // show again after 7 days

const CareerTrainingAnnouncement = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lastSeenAt = Number(localStorage.getItem(STORAGE_KEY));
    const shouldShow = !lastSeenAt || Date.now() - lastSeenAt > REMIND_AFTER_MS;
    if (shouldShow) {
      setIsOpen(true);
    }
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all animate-scale-in">
        <button
          onClick={handleClose}
          aria-label="Close announcement"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6">
          <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
          New Career Training Programs!
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Boost your job search with our new career training courses covering resume
          building, interview skills, and in-demand technical skills. Get ahead of the
          competition today.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Maybe Later
          </button>
          <Link
            to="/jobs"
            onClick={handleClose}
            className="flex-1 px-6 py-3 text-center text-white rounded-xl font-semibold transition-colors bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerTrainingAnnouncement;
