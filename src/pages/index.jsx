import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout/Layout';

// RWD conditional rendering
export default function Home({}) {
  return (
    <div>
      <Layout />
    </div>
  );
}
