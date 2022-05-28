import { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from "next/link";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";

const Home = ({ campaigns = [] }) => {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        id: 1,
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <h3>Open campaign</h3>
      {renderCampaigns()}
      <Button
        floated="right"
        content="Create Campaign"
        icon="add circle"
        primary
      />
    </Layout>
  );
};

export async function getServerSideProps()  {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return {
    props: {
      campaigns,
    },
  };
}

export default Home;
