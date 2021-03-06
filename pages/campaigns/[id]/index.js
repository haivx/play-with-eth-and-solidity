import { useRouter } from "next/router";
import { Card } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

const CampaignPage = ({
  minimumContribution,
  balance,
  requestCounts,
  manager,
  approversCount,
}) => {
  const renderCard = () => {
    const items = [
      {
        header: manager,
        meta: "Address of manager",
        description:
          "The manager created this campain and create  requrest to withdraw money",
          style: {overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: "Minimum contribution(Wei)",
        description:
          "You must contribute at least this much wei to become a approver",
          style: {overflowWrap: 'break-word' }
      },
      {
        header: requestCounts,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract",
          style: {overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "NUmber of people who have aldready donated to this campaign",
          style: {overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: "Campaign (ether)",
        description:
          "The balance is how much this campaign has left to spend",
          style: {overflowWrap: 'break-word' }
      },
    ];
    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      Show Campaign
      {renderCard()}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const campaign = Campaign(params.id);
  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestCounts: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
}

export default CampaignPage;
