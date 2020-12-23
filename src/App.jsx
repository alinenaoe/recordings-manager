import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

import { listRecordings } from './graphql/queries';
import { updateRecording } from './graphql/mutations';

import RecordingItem from './components/RecordingItem';
import Header from './components/Header';
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

  const handleAddLike = async (id) => {
    try { 
      const recording = recordings.find(item => item.id === id);

      recording.like++;
      delete recording.createdAt;
      delete recording.updatedAt;

      const recordingData = await API.graphql(graphqlOperation(updateRecording, {
        input: recording
      }));

      const recordingsList = [...recordings];
      recordingsList.map(item => item.id === id 
        ? recordingData.data.updateRecording
        : item
      );

      setRecordings(recordingsList)

    } catch(error) {

    }
  }

  return (
    <div className="App">
      <Header />

      <div className="recordingsList">
        { recordings.map(recording => (
          <RecordingItem recording={recording} handleAddLike={handleAddLike} />
        )) }
      </div>
    </div>
  );
}

export default withAuthenticator(App);
