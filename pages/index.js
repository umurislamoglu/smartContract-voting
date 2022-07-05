import Layout from "../components/Layout";
import contract from "../ethereum/contract";
import CandidateCard from "../components/CandidateCard";
import { Grid , Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { useEffect, useState } from "react";
import { Router } from "../routes";

const Home = (props) => {
  const { candidates } = props;
  const [isVoted, setIsVoted] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(async () => {
    const account = await web3.currentProvider.selectedAddress;
    const voted = await contract.methods.voters(account).call();
    setIsVoted(voted);
    setLoading(false)
  }, []);
 
  const onResultsClick = () => {
    Router.replaceRoute("/candidates/results");
  }
  
  return (
    <Layout>
      {
      !loading && (isVoted ? (
        <div style={{
          height:"89vh",
          display:"flex",
          flexDirection:"column",  
          justifyContent:"center", 
          alignItems:"center"
          }}>
          <div>You have already voted.</div>
          <Button primary onClick={onResultsClick}>See Results!</Button>
        </div>
      ) : (
        <Grid columns={3}>
          <Grid.Row>
            {candidates.map((candidate, index) => {
              return (
                <Grid.Column key={index}>
                  <CandidateCard candidate={candidate} index={index} />
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      ))}
    </Layout>
  );
};

export async function getServerSideProps() {
  const candidates = await contract.methods.getCandidates().call();
  return {
    props: { candidates },
  };
}

export default Home;
