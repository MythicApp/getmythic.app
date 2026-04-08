import SubmitPage from '@/components/pages/submit/index';

export default function Submit(props) {
  return <SubmitPage {...props} />;
}

export async function getServerSideProps() {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'data', 'submissions.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const submissions = JSON.parse(fileContents);
  const maxId = submissions.length > 0 ? Math.max(...submissions.map(s => s.ID || 0)) : 0;
  return {
    props: {
      nextId: maxId + 1,
    },
  };
}