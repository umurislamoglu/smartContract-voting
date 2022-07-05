import React from "react";
import { Card, Image, Feed } from "semantic-ui-react";

const ResultCard = (props) => {
  const { candidate } = props;

  return (
    <Card style={{marginTop:"20px"}}>
      <Card.Content>
        <Image floated="right" size="mini" src={candidate[3]} />
        <Card.Header>{candidate[1]}</Card.Header>
        <Card.Meta style={{ overflowWrap: "break-word" }}>
          {candidate[0]}
        </Card.Meta>
        <Card.Description>{candidate[2]}</Card.Description>
      </Card.Content>
      <Card.Content>{`Vote Count: ${candidate[4]}`}</Card.Content>
    </Card>
  );
};

export default ResultCard;
