import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { Section, Stack } from '@/components/common/layout';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.75rem 3rem;
  border: 1px solid #d1d1d6;
  border-radius: 20px;
  font-size: 1rem;  color: #000;
  text-align: center;  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;
const StyledTextarea = styled.textarea`
  padding: 1.5rem 10rem;
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  font-size: 1rem;  color: #000;
  text-align: left;  transition: border-color 0.2s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;
const Message = styled.p`
  text-align: center;
  color: ${props => props.success ? '#34c759' : '#ff3b30'};
  font-weight: 500;
`;

export default function SubmitPage() {
  const [game, setGame] = useState('');
  const [engine, setEngine] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/GameCompatabilityAPI?submit=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ game, engine, notes }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Submission successful!');
        setGame('');
        setEngine('');
        setNotes('');
      } else {
        setMessage(data.error || 'Submission failed');
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Submit Game Compatibility - Mythic</title>
        <meta name="description" content="Submit a new game for compatibility testing with Mythic." />
      </Head>
      <Section contained gutterTop gutterBottom>
        <Stack gap={3} align="center">
          <Typography variant="headline" align="center">
            Submit Game Compatibility
          </Typography>
          <Typography variant="intro" color="tertiary" align="center">
            Help us improve Mythic by submitting new games to our compatability list.
          </Typography>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <label htmlFor="game">
                <Typography variant="body">Game</Typography>
              </label>
              <StyledInput
                type="text"
                id="game"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                required
                placeholder="Enter the name of the game"
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="engine">
                <Typography variant="body">Engine Version</Typography>
              </label>
              <StyledInput
                type="text"
                id="engine"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                required
                pattern="^\d+\.\d+\.\d+$"
                placeholder="Enter the engine version (e.g. 0.6.0)"
              />
            </InputGroup>
            <InputGroup>
              <label htmlFor="notes">
                <Typography variant="body">Performance Notes</Typography>
              </label>
              <StyledTextarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any notes about the game's performance (optional)"
                rows="4"
              />
            </InputGroup>
            <Button type="submit" size="lg" disabled={loading} style={{ alignSelf: 'center' }}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>
          {message && (
            <Message success={message.includes('successful')}>
              {message}
            </Message>
          )}
        </Stack>
      </Section>
    </>
  );
}