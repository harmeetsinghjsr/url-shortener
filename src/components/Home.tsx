import { useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid, Alert
} from '@mui/material';
import { urlMap } from '../dataStore';
import { generateShortCode, isValidURL, isAlphanumeric } from '../utils/helpers';
import logger from 'C:/Users/hs978/CodeSpace/AffordMed/url-shortener/src/middleware/logger.ts';

type InputRow = {
  longURL: string;
  customCode: string;
  validity: string;
  message: string;
  error: string;
};

export default function Home() {
  const [rows, setRows] = useState<InputRow[]>(
    Array.from({ length: 5 }, () => ({
      longURL: '',
      customCode: '',
      validity: '',
      message: '',
      error: ''
    }))
  );

  const updateRow = (index: number, field: keyof InputRow, value: string) => {
    setRows(prev =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleShorten = (index: number) => {
    const { longURL, customCode, validity } = rows[index];

    if (!isValidURL(longURL)) {
      updateRow(index, 'error', 'Invalid URL format');
      logger('Invalid URL format', 'error');
      return;
    }

    const code = customCode || generateShortCode();

    if (!isAlphanumeric(code) || code.length > 10) {
      updateRow(index, 'error', 'Shortcode must be alphanumeric & ≤ 10 characters');
      logger('Invalid shortcode input', 'error');
      return;
    }

    if (urlMap.has(code)) {
      updateRow(index, 'error', 'Shortcode already exists');
      logger(`Shortcode collision: ${code}`, 'warn');
      return;
    }

    const mins = parseInt(validity) || 30;
    const expiry = new Date(Date.now() + mins * 60000);

    urlMap.set(code, { longURL, expiry, hits: 0 });
    logger(`Short URL created: ${code} -> ${longURL}`, 'info');

    updateRow(index, 'message', `http://localhost:3000/${code}`);
    updateRow(index, 'error', '');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Grid container spacing={3}>
        {rows.map((row, i) => (
          <Grid item xs={12} key={i}>
            <TextField
              fullWidth
              label="Long URL"
              value={row.longURL}
              onChange={(e) => updateRow(i, 'longURL', e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Custom Code (optional)"
              value={row.customCode}
              onChange={(e) => updateRow(i, 'customCode', e.target.value)}
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Validity (minutes)"
              type="number"
              value={row.validity}
              onChange={(e) => updateRow(i, 'validity', e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button variant="contained" onClick={() => handleShorten(i)}>Shorten</Button>

            {row.message && <Alert severity="success" sx={{ mt: 1 }}>{row.message}</Alert>}
            {row.error && <Alert severity="error" sx={{ mt: 1 }}>{row.error}</Alert>}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
