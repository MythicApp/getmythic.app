import AccountPage from '@/components/pages/account/index';
import { getUserFromToken } from '@/utils/auth';

export default function Account(props) {
  return <AccountPage {...props} />;
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;

  if (!token) {
    return {
      props: {
        submissions: [],
      },
    };
  }

  const user = getUserFromToken(token);
  if (!user) {
    return {
      props: {
        submissions: [],
      },
    };
  }

  const currentUserNickname = user.nickname;

  const fs = require('fs');
  const path = require('path');
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

  const userSubmissions = allSubmissions.filter(sub => sub.submittedBy === currentUserNickname);

  const formattedSubmissions = userSubmissions.map(sub => ({
    ...sub,
    formattedSubmittedAt: new Date(sub.submittedAt).toLocaleString(),
  }));

  return {
    props: {
      submissions: formattedSubmissions,
    },
  };
}