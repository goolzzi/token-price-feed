import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Container, CircularProgress } from '@mui/material';
import { useApi } from '../../libs/hooks/api';

const UnsubscribePage = () => {
  const params = useParams();
  const api = useApi();

  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  React.useEffect(() => {
    if (params.address && params.coin_pair) {
      api
        .delete(`/feed/${params.address}/${params.coin_pair}`)
        .then(() => {
          setLoading(false);
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
          setLoading(false);
        });
    }
  }, [params.address, params.coin_pair]);

  return (
    <Container>
      {loading && <CircularProgress />}
      {success && <Alert severity="info">Your Price Feed has been deleted</Alert>}
      {!loading && !success && <Alert severity="error">Something went wrong!</Alert>}
    </Container>
  );
};

export default UnsubscribePage;
