import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { urlMap } from '../dataStore';
import { logger } from '../middleware/logger';

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const record = urlMap.get(shortcode!);

    if (!record) {
logger(`Invalid shortcode access: ${shortcode}`, 'error');
      alert('Shortcode not found.');
      navigate('/');
      return;
    }

    if (new Date() > record.expiry) {
      logger(`Invalid shortcode expired: ${shortcode}`, 'warn');
      alert('This link has expired.');
      navigate('/');
      return;
    }

    record.hits += 1;
    logger(`Redirected to: ${record.longURL}`, 'info');
    window.location.href = record.longURL;
  }, [shortcode]);

  return <p>Redirecting...</p>;
}