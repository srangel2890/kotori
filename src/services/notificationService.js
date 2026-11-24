import EmailProvider from '../providers/emailProvider.js';

const providers = {
  email: EmailProvider
};

export async function sendNotification(notification) {
  const provider = providers[notification.channel];

  if (!provider) {
    throw new Error('Unsupported notification channel');
  }

 return await new provider(notification).send();
}