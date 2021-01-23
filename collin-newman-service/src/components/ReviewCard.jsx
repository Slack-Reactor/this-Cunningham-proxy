import React from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Carousel from 'react-material-ui-carousel';
import Rating from '@material-ui/lab/Rating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import moment from 'moment';

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
  avatar: {
    backgroundColor: red[500],
  },
  iconFilled: {
    color: '#34E0A1',
  },
}));

const ReviewCard = ({ review, helpfulClickHandler }) => {
  const classes = useStyles();
  const date = moment(review.created_at).format('MMM-YYYY');
  const dateOfExperience = moment(review.dateOfExperience).format('MMM-YYYY');
  const { _id } = review;

  const imagesComponent = () => {
    const { images } = review;
    if (images.length === 0) {
      return null;
    }
    if (images.length === 1) {
      return (
        <CardMedia
          className={classes.media}
          image={images[0]}
          title="reviews pic"
        />
      );
    }
    return (
      <Carousel>
        {images.map((image) => (
          <CardMedia
            className={classes.media}
            image={image}
            title="reviews pic"
            key={image}
          />
        ))}
      </Carousel>
    );
  };

  const helpfulVotes = () => {
    if (review.helpfulVotes === 1) {
      return '1 Helpful vote.';
    }
    return `${review.helpfulVotes} Helpful votes.`;
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={review.profilePic} alt="profile pic" />
          </Avatar>
          )}
        action={(
          <IconButton aria-label="settings">
            <MoreHorizIcon />
          </IconButton>
          )}
        title={(
          <Typography variant="subtitle1" color="textPrimary" component="div">
            {review.userName}
            <Typography
              display="inline"
              variant="caption"
              color="textSecondary"
              component="p"
              data-testid="dateOfReview"
            >
              {` wrote a review ${date}`}
            </Typography>
          </Typography>
        )}
        subheader={(
          <>
            <LocationOnIcon style={{ fontSize: 14 }} />
            <Typography display="inline" variant="caption" color="textSecondary" component="p">
              {review.userHomeLocation}
            </Typography>
          </>
        )}
      />
      {imagesComponent()}
      <CardContent>
        <Rating
          max={5}
          value={review.starRating}
          readOnly
          className={classes.iconFilled}
          icon={(
            <FiberManualRecordIcon />
          )}
        />
        <Typography variant="h6" color="textPrimary" component="h6">
          {review.reviewTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" paragraph>
          {review.reviewBody}
        </Typography>
        <Typography variant="body2" color="textPrimary" component="div" paragraph>
          Date of experience:
          <Typography display="inline" variant="body2" color="textSecondary" component="p">
            {` ${dateOfExperience}`}
          </Typography>
        </Typography>
        <Typography
          data-testid="votesCounter"
          variant="caption"
          color="textSecondary"
          component="p"
          paragraph
        >
          {helpfulVotes()}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="i found this helpful"
          onClick={(e) => { helpfulClickHandler(e); }}
          data-id={_id}
          data-testid="helpfulBtn"
        >
          <ThumbUpAltOutlinedIcon data-id={_id} />
          <Typography variant="caption" color="textPrimary" component="p" data-id={_id}>
            Helpful
          </Typography>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
          <Typography variant="caption" color="textPrimary" component="p">
            Share
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

ReviewCard.propTypes = {
  review: Proptypes.shape({
    created_at: Proptypes.string,
    dateOfExperience: Proptypes.string,
    destination: Proptypes.string,
    helpfulVotes: Proptypes.number,
    images: Proptypes.arrayOf(Proptypes.string),
    profilePic: Proptypes.string,
    reviewBody: Proptypes.string,
    reviewTitle: Proptypes.string,
    starRating: Proptypes.number,
    userHomeLocation: Proptypes.string,
    userName: Proptypes.string,
    _id: Proptypes.string,
  }).isRequired,
  helpfulClickHandler: Proptypes.func.isRequired,
};

export default ReviewCard;
