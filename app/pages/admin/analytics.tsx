import { NextPage } from "next";
import Head from "next/head";
import AnalyticsDashboard from "../../components/AnalyticsDashboard";

const AnalyticsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Analytics - Amazed.DEV</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className="admin-page">
        <div className="container-content">
          <AnalyticsDashboard />
        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
