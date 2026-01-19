import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';
import { Section, Stack } from '@/components/common/layout';
import Link from 'next/link';

const ratingLabels = ['', 'unplayable', 'bad', 'playable', 'good', 'perfect'];

const Form = styled.form`
  width: 75%;
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
  padding: 0.75rem 1.5rem;
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

const StyledRange = styled.input`
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d1d1d6;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  height: 35px;

  &::-webkit-slider-track {
    background: #ddd;
    height: 4px;
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #007aff;
    cursor: pointer;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
    transition: box-shadow 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 6px rgba(0, 122, 255, 0.2);
  }

  &:focus {
    outline: none;
    border-color: #007aff;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`;

const StyledTextarea = styled.textarea`
  padding: 1.5rem 1.5rem;
  border: 1px solid #d1d1d6;
  border-radius: 8px;
  font-size: 1rem;  color: #000;
  text-align: left;  transition: border-color 0.2s ease;
  resize: horizontal;
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

const SliderContainer = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const LabelsContainer = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 0;
  right: 0;
  padding: 0.5rem 0;
`;

const LabelBubble = styled.span`
  position: absolute;
  left: ${props => ((props.rating - 1) * 25)}%;
  transform: translateX(-50%);
  background: #007aff;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  transition: all 0.2s ease;
`;

const AuthFormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AuthMessage = styled.p`
  text-align: center;
  color: ${props => props.error ? '#ff3b30' : '#34c759'};
  font-weight: 500;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #007aff;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
`;

const AuthForm = ({
  isSignup,
  setIsSignup,
  authEmail,
  setAuthEmail,
  authPassword,
  setAuthPassword,
  authNickname,
  setAuthNickname,
  authMessage,
  authLoading,
  handleLogin,
  handleSignup,
  setShowAuth
}) => (
  <AuthFormContainer>
    <Typography variant="headline" align="center">
      {isSignup ? 'Create Account' : 'Login'}
    </Typography>
    {isSignup && (
      <InputGroup>
        <label htmlFor="authNickname">
          <Typography variant="body">Nickname</Typography>
        </label>
        <StyledInput
          type="text"
          id="authNickname"
          value={authNickname}
          onChange={(e) => setAuthNickname(e.target.value)}
          required
          placeholder="Enter your nickname"
        />
      </InputGroup>
    )}
    <InputGroup>
      <label htmlFor="authEmail">
        <Typography variant="body">Email</Typography>
      </label>
      <StyledInput
        type="email"
        id="authEmail"
        value={authEmail}
        onChange={(e) => setAuthEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />
    </InputGroup>
    <InputGroup>
      <label htmlFor="authPassword">
        <Typography variant="body">Password</Typography>
      </label>
      <StyledInput
        type="password"
        id="authPassword"
        value={authPassword}
        onChange={(e) => setAuthPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />
    <Link //Placeholder for password reset, need to program a email reset system
      href="https://tse3.mm.bing.net/th/id/OIP.9181xDmF1ZYKuJqXSlKqLgHaFN?rs=1&pid=ImgDetMain&o=7&rm=3"
      target="_blank"
      style={{ 
        textDecoration: 'underline', 
        color: '#0070f3',
        size: "lg",
        alignSelf: 'center',
        padding: '1rem'

      }}
    >
      Forgot your password?
    </Link>
    </InputGroup>
    <Button
      onClick={isSignup ? handleSignup : handleLogin}
      size="lg"
      disabled={authLoading}
      style={{ alignSelf: 'center' }}
    >
      {authLoading ? (isSignup ? 'Creating...' : 'Logging in...') : (isSignup ? 'Create Account' : 'Login')}
    </Button>
    <ToggleButton onClick={() => setIsSignup(!isSignup)}>
      {isSignup ? 'Already have an account? Login' : 'Need an account? Sign up'}
    </ToggleButton>
    <Button onClick={() => setShowAuth(false)} size="sm" style={{ alignSelf: 'center' }}>
      Cancel
    </Button>
    {authMessage && (
      <AuthMessage error={!authMessage.includes('successfully')}>
        {authMessage}
      </AuthMessage>
    )}
  </AuthFormContainer>
);

export default function SubmitPage({ nextId }) {
  const [game, setGame] = useState('');
  const [engine, setEngine] = useState('');
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(3);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authNickname, setAuthNickname] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (message.includes('successful')) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authEmail)) {
      setAuthMessage('Invalid email format');
      return;
    }
    setAuthLoading(true);
    setAuthMessage('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setUser(data.user);
        setShowAuth(false);
        setAuthEmail('');
        setAuthPassword('');
      } else {
        setAuthMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setAuthMessage('An error occurred: ' + error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authEmail)) {
      setAuthMessage('Invalid email format');
      return;
    }
    setAuthLoading(true);
    setAuthMessage('');
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: authNickname, email: authEmail, password: authPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuthMessage('Account created successfully! Please log in.');
        setIsSignup(false);
        setAuthNickname('');
      } else {
        setAuthMessage(data.error || 'Signup failed');
      }
    } catch (error) {
      setAuthMessage('An error occurred: ' + error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAuth(true);
      return;
    }
    setLoading(true);
    setMessage('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/GameCompatabilityAPI?submit=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          game, 
          engine, 
          notes, 
          rating: ratingLabels[rating], 
          ID: nextId,
          submittedAt: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Submission successful!');
        setGame('');
        setEngine('');
        setNotes('');
        setRating(3);
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
          {isLoggedIn ? (
            <>
              <Typography variant="body" align="center">
                Logged in as {user.nickname} ({user.email})
                <Button onClick={handleLogout} size="sm" style={{ marginLeft: '1rem' }}>
                  Logout
                </Button>
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
                  <Typography variant="body" color="tertiary">
                    To get your current engine version, head to Mythics settings and look for &quot;Engine Version&quot; under the &quot;Engine&quot; section.
                  </Typography>
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
                  <label htmlFor="rating">
                    <Typography variant="body">Rating - Please rate the performance of the tested game</Typography>
                  </label>
                  <SliderContainer>
                    <StyledRange
                      type="range"
                      id="rating"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                    />
                    <LabelsContainer>
                      <LabelBubble rating={rating}>{ratingLabels[rating]}</LabelBubble>
                    </LabelsContainer>
                  </SliderContainer>
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
            </>
          ) : showAuth ? (
            <AuthForm
              isSignup={isSignup}
              setIsSignup={setIsSignup}
              authEmail={authEmail}
              setAuthEmail={setAuthEmail}
              authPassword={authPassword}
              setAuthPassword={setAuthPassword}
              authNickname={authNickname}
              setAuthNickname={setAuthNickname}
              authMessage={authMessage}
              authLoading={authLoading}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              setShowAuth={setShowAuth}
            />
          ) : (
            <Stack gap={2} align="center">
              <Typography variant="body" align="center">
                You need to be logged in to submit a report.
              </Typography>
              <Button onClick={() => setShowAuth(true)} size="lg">
                Login or Create Account
              </Button>
            </Stack>
          )}
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