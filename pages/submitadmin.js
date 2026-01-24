import SubmitAdminPage from '@/components/pages/submitadmin/index';
import { getUserFromToken } from '@/utils/auth';

export default function SubmitAdmin(props) {
  return <SubmitAdminPage {...props} />;
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  if (!token) {
    return {
      props: {
        error: 'No token',
        submissions: [],
      },
    };
  }

  const user = getUserFromToken(token);
  if (!user) {
    return {
      props: {
        error: 'Invalid token',
        submissions: [],
      },
    };
  }

  // Load config to get admin emails
  const fs = require('fs');
  const path = require('path');
  const configFilePath = path.join(process.cwd(), 'data', 'config.json');

  let config;
  try {
    const configData = fs.readFileSync(configFilePath, 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    console.error('Error reading config.json:', error);
    return {
      props: {
        error: 'Config read error',
        submissions: [],
      },
    };
  }

  const adminEmails = config.adminEmails || [];
  if (!adminEmails.includes(user.email)) {
    return {
      props: {
        error: `ERROR: User is not admin`,
        submissions: [],
      },
    };
  }

  // Load all submissions
  const submissionsFilePath = path.join(process.cwd(), 'data', 'submissions.json');

  let submissionsData;
  try {
    submissionsData = fs.readFileSync(submissionsFilePath, 'utf8');
  } catch (error) {
    console.error('Error reading submissions.json:', error);
    return {
      props: {
        submissions: [],
      },
    };
  }

  let allSubmissions;
  try {
    allSubmissions = JSON.parse(submissionsData);
  } catch (error) {
    console.error('Error parsing submissions.json:', error);
    return {
      props: {
        submissions: [],
      },
    };
  }

  const formattedSubmissions = allSubmissions.map(sub => ({
    ...sub,
    formattedSubmittedAt: new Date(sub.submittedAt).toLocaleString(),
  }));

  return {
    props: {
      submissions: formattedSubmissions,
    },
  };
}