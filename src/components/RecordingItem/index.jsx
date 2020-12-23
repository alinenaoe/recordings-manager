import { IconButton, Paper } from '@material-ui/core';
import { Favorite, PlayArrow } from '@material-ui/icons';
import './styles.css';

const RecordingItem = ( { recording, handleAddLike } ) => {

  return(
      <Paper variant="outlined" elevation={2} key={recording.id}>
      <div className="recordingCard">
        <IconButton aria-label="play">
          <PlayArrow />
        </IconButton>
        <div className="main-info">
          <div className="title">{recording.title}</div>
          <div className="interviewee">{recording.interviewee}</div>
        </div>
        <div className="likes-container">
          <IconButton aria-label="like" onClick={() => handleAddLike(recording.id)}>
            <Favorite />
          </IconButton>
          {recording.like}
        </div>
        <div className="description">{recording.description}</div>
      </div>
    </Paper>
  )
}

export default RecordingItem;