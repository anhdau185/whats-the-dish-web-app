import React, { FC } from 'react';
import { Button, Typography } from '@material-ui/core';

const ErrorNotice: FC<{ fetchData?: () => void | Promise<void> }> = ({
  children,
  fetchData
}) => {
  const allowRetry = fetchData != null;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Typography variant="h5" color="textSecondary" style={{ marginBottom: '0.5rem' }}>
        {children}
      </Typography>
      {allowRetry && (
        <Button variant="contained" color="primary" onClick={fetchData}>
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorNotice;
