import { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Typography from '@/components/common/Typography';
import { Section } from '@/components/common/layout';
import { Trash2 } from 'react-feather';

const Container = styled.div`
  padding: 2rem;
  color: var(--fill-override);
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

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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

export default function AccountPage({ submissions: initialSubmissions }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const response = await fetch('/api/delete-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setSubmissions(submissions.filter(sub => sub.ID !== id));
      } else {
        alert('Failed to delete the report. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Container>
      <Head>
        <title>Account - My Submissions</title>
      </Head>
      <Typography variant="h1">My Account</Typography>
      <Typography variant="body">Here are all the game compatibility reports you have submitted:</Typography>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '50vh', maxWidth: '1600px', mx: 'auto', px: 4}}>
            <Section>
                {submissions.length === 0 ? (
                <Typography variant="body">You haven&apos;t submitted any reports yet.</Typography>
                ) : (
                submissions.map((submission) => (
                    <SubmissionCard key={submission.ID}>
                        <DeleteButton onClick={() => handleDelete(submission.ID)} title="Delete report">
                             <Trash2 size={16} />
                        </DeleteButton>
                    <Title>{submission.game}</Title>
                    <Detail><strong>Engine:</strong> {submission.engine}</Detail>
                    <Detail><strong>Rating:</strong> {submission.rating}</Detail>
                    <Detail><strong>Notes:</strong> {submission.notes}</Detail>
                    <Detail><strong>Submitted At:</strong> {submission.formattedSubmittedAt}</Detail>
                    </SubmissionCard>
                ))
                )}
            </Section> 
        </box>
        </div>
    </Container>
  );
}   