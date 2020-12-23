import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';

import { listRecordings } from './graphql/queries';

import { IconButton, Paper } from '@material-ui/core';
import { Favorite, PlayArrow } from '@material-ui/icons';
import './App.css';


Amplify.configure(awsconfig);

function App() {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
      fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try { 
      const recordingsData = await API.graphql(graphqlOperation(listRecordings));
      const recordingsList = recordingsData.data.listRecordings.items;
      console.log('recordings list: ', recordingsList);
      setRecordings(recordingsList);
    } catch(error){
      console.log('error on fetching recordings', error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
         <AmplifySignOut />
         <h2>App Content</h2>  
      </header>

      <div className="recordingsList">
        { recordings.map(recording => (
            <Paper variant="outlined" elevation={2} key={recording.id}>
              <div className="recordingCard">
                <IconButton aria-label="play">
                  <PlayArrow />
                </IconButton>
                <div>
                  <div className="title">{recording.title}</div>
                  <div className="interviewee">{recording.interviewee}</div>
                </div>
                <div>
                  <IconButton aria-label="like">
                    <Favorite />
                  </IconButton>
                  {recording.like}
                </div>
              </div>
              <div className="description">{recording.description}</div>
            </Paper>
        )) }
      </div>
    </div>
  );
}

export default withAuthenticator(App);
