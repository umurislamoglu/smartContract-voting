import React from "react";
import contract from "../ethereum/contract";
import Layout from "../components/Layout";
import { Grid, Button } from "semantic-ui-react";
import ResultCard from "../components/ResultCard";

const Results = (props) => {

  const { candidates } = props;
  return (
    <Layout>
      <Grid columns={3}>
        <Grid.Row>
          {candidates.map((candidate, index) => {
            return (
              <Grid.Column key={index}>
                <ResultCard candidate={candidate} index={index} />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps() {
  const candidates = await contract.methods.getCandidates().call();
  return {
    props: { candidates },
  };
}

export default Results;
