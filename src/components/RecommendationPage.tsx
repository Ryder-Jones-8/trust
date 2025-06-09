import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { RecommendationProduct } from '../types';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid #444;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const RecommendationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecommendationItem = styled.li`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const RecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sport, category, formData } = (location.state || {}) as {
    sport?: string;
    category?: string;
    formData?: Record<string, string | number>;
  };

  const [recommendations, setRecommendations] = useState<RecommendationProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!sport) return;
      setLoading(true);
      setError('');
      try {
        const ownerData = localStorage.getItem('shopOwner');
        const shopId = ownerData ? JSON.parse(ownerData).id : undefined;
        const response = await fetch('http://localhost:3001/api/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sport, category, formData, shopId })
        });
        const data = await response.json();
        if (response.ok) {
          setRecommendations(data);
        } else {
          setError(data.error || 'Failed to load recommendations');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
  }, [sport, category, formData]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>← Back</BackButton>
      <Title>Recommended Products</Title>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <RecommendationList>
          {recommendations.map(item => (
            <RecommendationItem key={item.id}>
              <strong>{item.name}</strong> - ${item.price.toFixed(2)} (score {item.score}%)
            </RecommendationItem>
          ))}
        </RecommendationList>
      )}
    </Container>
  );
};

export default RecommendationPage;
