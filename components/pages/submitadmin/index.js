import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Typography from '@/components/common/Typography';
import { Section, Stack } from '@/components/common/layout';
import { Check, X } from 'react-feather';

const Container = styled.div`
  padding: 2rem;
  color: var(--fill-override);
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid var(--fill-gray-tertiary);
  border-radius: 8px;
  background: var(--fill-secondary);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--fill-override);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--fill-gray-tertiary);
  border-radius: 4px;
  background: var(--fill-primary);
  color: var(--fill-override);
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--fill-blue);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--fill-blue-secondary);
  }
`;

const SubmissionCard = styled.div`
  border: 1px solid var(--fill-gray-tertiary);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: var(--fill-secondary);
  color: var(--fill-override);
  position: relative;
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  color: var(--fill-override);
`;

const Detail = styled.p`
  margin: 0.25rem 0;
  color: var(--glyph-gray-secondary);
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
`;

const ApproveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--glyph-green);
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--fill-green-secondary);
  }
`;

const LogoutButton = styled.button`
  padding: 0.5rem 1rem;
  background: var(--fill-red);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: var(--fill-red-secondary);
  }
`;

const DenyButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--glyph-red);
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--fill-red-secondary);
  }
`;

export default function SubmitAdminPage({ submissions: initialSubmissions, error }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Reload the page to load submissions
        window.location.reload();
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (error === 'No token' || error === 'Invalid token') {
    return (
      <Container>
        <Head>
          <title>Admin Login - Moderate Submissions</title>
        </Head>
        <Section contained gutterTop gutterBottom>
          <Stack gap={2} align="center">
            <Typography variant="headline" align="center">Admin Login</Typography>
            <Typography variant="intro" color="tertiary" align="center">
              Please log in to access the submission moderation page.
            </Typography>
          </Stack>
        </Section>
        <LoginForm onSubmit={handleLogin}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </FormGroup>
          {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </Button>
        </LoginForm>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Head>
          <title>Admin - Moderate Submissions</title>
        </Head>
        <div>Error: {error}</div>
      </Container>
    );
  }

  const handleDeny = async (id) => {
    if (!confirm('Are you sure you want to deny this report?')) {
      return;
    }

    try {
      const response = await fetch('/api/deny-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setSubmissions(submissions.filter(sub => sub.ID !== id));
      } else {
        alert('Failed to deny the report. Please try again.');
      }
    } catch (error) {
      console.error('Error denying submission:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      // Reload the page to show login form
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
      // Still reload even if error
      window.location.reload();
    }
  };

  return (
    <Container>
      <Head>
        <title>Admin - Moderate Submissions</title>
      </Head>
      <Section contained gutterTop gutterBottom>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack gap={2}>
            <Typography variant="headline">Submission Moderation</Typography>
            <Typography variant="intro" color="tertiary">
              Review game compatibility reports.
            </Typography>
          </Stack>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </Section>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Section>
          {submissions.length === 0 ? (
            <Typography variant="body">No submissions to moderate.</Typography>
          ) : (
            submissions.map((submission) => (
              <SubmissionCard key={submission.ID}>
                <ButtonContainer>
                  <ApproveButton onClick={() => handleApprove(submission.ID)} title="Approve report">
                    <Check size={16} />
                  </ApproveButton>
                  <DenyButton onClick={() => handleDeny(submission.ID)} title="Deny report">
                    <X size={16} />
                  </DenyButton>
                </ButtonContainer>
                <Title>{submission.game}</Title>
                <Detail><strong>Engine:</strong> {submission.engine}</Detail>
                <Detail><strong>Rating:</strong> {submission.rating}</Detail>
                <Detail><strong>Notes:</strong> {submission.notes}</Detail>
                <Detail><strong>Submitted By:</strong> {submission.submittedBy}</Detail>
                <Detail><strong>Submitted At:</strong> {submission.formattedSubmittedAt}</Detail>
              </SubmissionCard>
            ))
          )}
        </Section>
      </div>
    </Container>
  );
}