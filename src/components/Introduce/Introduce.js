import React from 'react';
import classes from './Introduce.scss';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = {
    button: {
        color: "#FFFFFF"
    }    
}
const introduce = (props) => (
    <div className={classes.Container}>
        <div className={classes.Text}>
        잘한일을 써보세요
        어제보다 오늘, 반드시 더 좋아집니다. 잘한일을 쓰는 것만으로도!
        </div>
        <Button component={Link} to="/auth" variant="raised" color="primary" className={props.classes.button}>
            시작하기
        </Button>
    </div>
)

export default withStyles(styles)(introduce);