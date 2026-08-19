import { delay } from '../utils/delay';

const STORAGE_KEY = 'newsletterSubscribers';
const getSubscribers = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveSubscribers = (subscribers) => localStorage.setItem(STORAGE_KEY, JSON.stringify(subscribers));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Subscribe an email to the newsletter, job offers, and career training updates
 */
export const subscribeToNewsletter = async (email) => {
	await delay();

	const normalizedEmail = (email || '').trim().toLowerCase();

	if (!normalizedEmail) {
		throw new Error('Email is required');
	}
	if (!EMAIL_REGEX.test(normalizedEmail)) {
		throw new Error('Please enter a valid email address');
	}

	const subscribers = getSubscribers();
	if (subscribers.some((s) => s.email === normalizedEmail)) {
		throw new Error('This email is already subscribed');
	}

	const newSubscriber = {
		id: Date.now(),
		email: normalizedEmail,
		topics: ['newsletter', 'jobOffers', 'careerTraining'],
		createdAt: new Date().toISOString(),
	};
	subscribers.push(newSubscriber);
	saveSubscribers(subscribers);
	return newSubscriber;
};

/**
 * Fetch all newsletter subscribers
 */
export const fetchAllSubscribers = async () => {
	await delay();
	return getSubscribers();
};
