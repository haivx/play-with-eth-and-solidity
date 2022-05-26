import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";

const CampaignNew = () => {
    const router = useRouter()

  const [minContribution, setMinContribution] = useState("");
  const [errorMsg, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minContribution).send({
        from: accounts[0],
      });
      router.push("/")

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <h1>New</h1>
      <Form onSubmit={onFormSubmit} error={!!errorMsg}>
        <Form.Field>
          <label>Minimum contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minContribution}
            onChange={(e) => setMinContribution(e.target.value)}
          />
        </Form.Field>
        <Message error header="Oop!" content={errorMsg} />
        <Button loading={loading} primary type="submit">
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
