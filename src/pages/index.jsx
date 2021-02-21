import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
