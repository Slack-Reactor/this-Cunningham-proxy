import React from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Modal from '@material-ui/core/Modal';
import Rating from '@material-ui/lab/Rating';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DropzoneArea } from 'material-ui-dropzone';
import ReviewFilters from './ReviewFilters';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  iconFilled: {
    color: '#34E0A1',
  },
  writeReview: {
    marginTop: '2vh',
    marginRight: '2vw',
    width: '100%',
  },
  paper: {
    position: 'absolute',
    width: '30%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #34E0A1',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '10%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modalContainer: {
    width: '55%',
  },
  modalItem: {
    width: '100%',
    margin: theme.spacing(1),
  },
  modalItemDropbox: {
    width: '100%',
    margin: theme.spacing(1),
  },
  modalMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'scroll',
  },
}));

const ReviewListControls = (props) => {
  const classes = useStyles();
  const {
    reviewsCount,
    writeReview,
    travelerRatings,
    handleChangeFilterTravelerType,
    handleChangeFilterLanguage,
    handleChangeFilterTimeOfYear,
    handleChangeRatingFilter,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [value, updateRating] = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = () => (
    <Card className={classes.paper}>
      <CardContent>
        <Typography>Rate your experience</Typography>
        <input
          id="hiddenInput"
          name="rating"
          type="number"
          value={value}
          hidden
          readOnly
        />
        <Rating
          max={5}
          id="ratingInput"
          className={classes.iconFilled}
          name="ratingStars"
          value={value}
          onChange={(event, newValue) => updateRating(newValue)}
          icon={(
            <FiberManualRecordIcon />
          )}
        />
        <Typography className={classes.modalItem}>Whats your name?</Typography>
        <TextField className={classes.modalItem} id="nameInput" label="Name" variant="outlined" multiline />
        <Typography className={classes.modalItem}>Where are you from?</Typography>
        <TextField className={classes.modalItem} id="homeInput" label="Where from" variant="outlined" multiline />
        <Typography className={classes.modalItem}>Leave a review</Typography>
        <TextField className={classes.modalItem} id="bodyInput" label="How was it" variant="outlined" multiline />
        <Typography className={classes.modalItem}>Give your review a title</Typography>
        <TextField className={classes.modalItem} id="titleInput" label="Title" variant="outlined" />
        <Typography className={classes.modalItem}>When did you go?</Typography>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">When</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="whenInput"
            onChange={() => null}
            label="Time of year"
            defaultValue=""
          >
            <MenuItem value="Mar-May">Mar-May</MenuItem>
            <MenuItem value="Jun-Aug">Jun-Aug</MenuItem>
            <MenuItem value="Sep-Nov">Sep-Nov</MenuItem>
            <MenuItem value="Dec-Feb">Dec-Feb</MenuItem>
          </Select>
        </FormControl>
        <Typography className={classes.modalItem}>Who did you go with?</Typography>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Who</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="whoInput"
            onChange={() => null}
            label="Time of year"
            defaultValue={[]}
            multiple
          >
            <MenuItem value="families">Families</MenuItem>
            <MenuItem value="couples">Couples</MenuItem>
            <MenuItem value="solo">Solo</MenuItem>
            <MenuItem value="business">Business</MenuItem>
            <MenuItem value="friends">Friends</MenuItem>
          </Select>
        </FormControl>
        <DropzoneArea
          className={classes.modalItemDropbox}
          acceptedFiles={['image/*']}
          id="fileInput"
          dropzoneText="Add some photos from your trip!"
          onChange={(files) => console.log('Files:', files)}
        />
        <Button
          className={classes.writeReview}
          onClick={() => {
            writeReview();
            handleClose();
          }}
          variant="contained"
        >Submit
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader
        avatar={(
          <Avatar aria-label="paper and pencil" className={classes.avatar}>
            <RateReviewIcon />
          </Avatar>
        )}
        title={(
          <Typography variant="subtitle1" color="textPrimary" component="div">
            Reviews
          </Typography>
        )}
        subheader={(
          <Typography data-testid="reviewCount" display="inline" variant="caption" color="textSecondary" component="p">
            {`${reviewsCount}`}
          </Typography>
        )}
        action={(
          <Button onClick={() => handleOpen()} className={classes.writeReview} variant="contained">
            Write a review.
          </Button>
        )}
      />
      <CardContent>
        <Divider />
        <ReviewFilters
          travelerRatings={travelerRatings}
          handleChangeFilterTravelerType={handleChangeFilterTravelerType}
          handleChangeFilterTimeOfYear={handleChangeFilterTimeOfYear}
          handleChangeFilterLanguage={handleChangeFilterLanguage}
          handleChangeRatingFilter={handleChangeRatingFilter}
        />
      </CardContent>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalMain}
      >
        {modalBody()}
      </Modal>
    </Card>
  );
};

ReviewListControls.propTypes = {
  reviewsCount: Proptypes.number.isRequired,
  travelerRatings: Proptypes.shape({
    excellent: Proptypes.number,
    good: Proptypes.number,
    average: Proptypes.number,
    poor: Proptypes.number,
    terrible: Proptypes.number,
  }).isRequired,
  writeReview: Proptypes.func.isRequired,
  handleChangeFilterTravelerType: Proptypes.func.isRequired,
  handleChangeFilterTimeOfYear: Proptypes.func.isRequired,
  handleChangeFilterLanguage: Proptypes.func.isRequired,
  handleChangeRatingFilter: Proptypes.func.isRequired,
};

export default ReviewListControls;
