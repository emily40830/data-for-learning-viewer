import { useRouter } from 'next/router';
import { useEffect } from 'react';
import httpAuthCheck from '../util/httpAuthCheck';

const Redirect = ({ to }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
};
// RWD conditional rendering
export default function Home({}) {
  const router = useRouter();

  return <Redirect to="/summary" />;
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  await httpAuthCheck(req, res);

  return {
    props: {},
  };
}
