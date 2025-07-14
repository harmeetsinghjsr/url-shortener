import { Box, Typography, Paper } from '@mui/material';
import { urlMap } from '../dataStore';
import { logger } from '../middleware/logger';

export default function Stats() {
  logger('Viewed stats page', 'info');

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>URL Statistics</Typography>
      {[...urlMap.entries()].map(([code, { longURL, expiry, hits }]) => (
        <Paper key={code} sx={{ p: 2, mb: 2 }}>
          <Typography><strong>Code:</strong> {code}</Typography>
          <Typography><strong>URL:</strong> {longURL}</Typography>
          <Typography><strong>Expires:</strong> {expiry.toLocaleString()}</Typography>
          <Typography><strong>Hits:</strong> {hits}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
