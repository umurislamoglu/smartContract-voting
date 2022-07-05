import React, { useState } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import contract from "../ethereum/contract";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const Newcandidate = () => {
  const [candidate, setCandidate] = useState({
    name: "",
    promise: "",
    photoUrl: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const account = await web3.currentProvider.selectedAddress;
      await contract.methods
        .becomeCandidate(candidate.name, candidate.promise, candidate.photoUrl)
        .send({
          from: account,
        });
      Router.replaceRoute("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
    setCandidate({
      name: "",
      promise: "",
      photoUrl: "",
    });
    setLoading(false);
  };

  return (
    <Layout>
      <Form
        onSubmit={onSubmit}
        error={!!errorMessage}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form.Field
          style={{
            width: "100%",
          }}
        >
          <label>Name</label>
          <Input
            value={candidate.name}
            onChange={(e) =>
              setCandidate({ ...candidate, name: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field
          style={{
            width: "100%",
          }}
        >
          <label>Promise</label>
          <Input
            value={candidate.promise}
            onChange={(e) =>
              setCandidate({ ...candidate, promise: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field
          style={{
            width: "100%",
          }}
        >
          <label>Photo Url</label>
          <Input
            value={candidate.protoUrl}
            onChange={(e) =>
              setCandidate({ ...candidate, photoUrl: e.target.value })
            }
          />
        </Form.Field>
        <Message error header="Ooops!" content={errorMessage} />
        <Button primary loading={loading} style={{ width: "250px" }}>
          Become Candidate
        </Button>
      </Form>
    </Layout>
  );
};

export default Newcandidate;
