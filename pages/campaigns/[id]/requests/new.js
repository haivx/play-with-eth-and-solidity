import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from 'next/router'

import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Layout from "../../../../components/Layout";

const RequestNew = ({ address }) => {
  const router = useRouter()
  const [state, _setState] = useState({
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  })
  
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    })
  }
  console.log({
    address,
    state
  })
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const campaign = Campaign(address);
    const { description, value, recipient } = state;

    setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      setState({ ...state, loading: false });
      router.push(`/campaigns/${address}`)
    } catch (err) {
      setState({ errorMessage: err.message, loading: false });
    } 
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!state.errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={state.description}
            onChange={(event) =>
              setState({ description: event.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={state.value}
            onChange={(event) => setState({ value: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient (Address)</label>
          <Input
            value={state.recipient}
            onChange={(event) =>
              setState({ recipient: event.target.value })
            }
          />
        </Form.Field>
        <Message error header="Oops!" content={state.errorMessage} />
        <Button primary loading={state.loading}>
          Create!
        </Button>
      </Form>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params || {};
  return {
    props: { address: id },
  };
}

export default RequestNew;
