import React, { useState } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import contract from "../ethereum/contract";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

const CandidateCard = (props) => {
  const { candidate, index } = props;
  const [loading, setLoading] = useState(false);

  const onVoteClick = async () => {
    setLoading(true);
    try {
      const account = await web3.currentProvider.selectedAddress;
      await contract.methods.vote(index).send({
        from: account,
      });
      Router.replaceRoute("/");
    } catch (error) {
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <Card style={{marginTop:"20px"}}>
      <Image src={candidate[3]} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{candidate[1]} </Card.Header>
        <Card.Meta style={{ overflowWrap: "break-word" }}>
          <span>{candidate[0]}</span>
        </Card.Meta>
        <Card.Description>{candidate[2]}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          onClick={onVoteClick}
          loading={loading}
          secondary
          style={{ width: "100%" }}
        >
          Vote
        </Button>
      </Card.Content>
    </Card>
  );
};

export default CandidateCard;
