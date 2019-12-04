import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import IconImageEye from '@material-ui/icons/RemoveRedEye';
import IconKeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, SimpleShowLayout, TextField } from 'react-admin';

console.log("in PostQuickPreviewButton");

const styles = theme => ({
    field: {
        // These styles will ensure our drawer don't fully cover our
        // application when teaser or title are very long
        '& span': {
            display: 'inline-block',
            maxWidth: '20em'
        }
    }
});


const PostPreviewView = ({ classes, ...props }) => (
   
    <SimpleShowLayout {...props}>
        {console.log("Props are " + JSON.stringify({...props}))}
        {console.log("Classes are " + JSON.stringify(classes.field))}
        <TextField source="id" />
        <TextField source="title" className={classes.field} />
        <TextField source="teaser" className={classes.field} />
    </SimpleShowLayout>
);

const mapStateToProps2 = (state, props) => ({
    // Get the record by its id from the react-admin state.
    
    
    record: state.admin.resources[props.resource]
        ? state.admin.resources[props.resource].data[props.id]
        : null,
    version: state.admin.ui.viewVersion,
    extra: null 
  
});
  
const mapStateToProps = function (state, props) {

    console.log("MSP + state: " + JSON.stringify(state.admin));
    console.log("MSP props :  " + JSON.stringify(props));
    // Get the record by its id from the react-admin state.
    return {

    record: state.admin.resources[props.resource]
        ? state.admin.resources[props.resource].data[props.id]
        : null,
    version: state.admin.ui.viewVersion,
    extra: null
    }
};


//const props = { iconSize: state.iconSize };
    
   
    

const PostPreview = connect(mapStateToProps, {})(
    withStyles(styles)(PostPreviewView)
    
);  // connects React & Redux??



class PostQuickPreviewButton extends Component {
    state = { showPanel: false };

    handleClick = (state) => {
        this.setState({ showPanel: true });    
        console.log("hitting the drawer  opening area");
        console.log("state is " + JSON.stringify(state));
    };

    handleCloseClick = () => {
        this.setState({ showPanel: false });
        console.log("hitting the drawer closing area");
    };

    render() {
        const { showPanel } = this.state;
        const { id } = this.props;
        console.log ("ThisState " + JSON.stringify(this.state));
        console.log("ThisProps " + JSON.stringify(this.props));
        return (
            <Fragment>
                <Button onClick={this.handleClick} label="ra.action.show">
                    <IconImageEye />
                </Button>
                <Drawer
                    anchor="right"
                    open={showPanel}
                    onClose={this.handleCloseClick}
                >
                    <div>
                        <Button label="Close" onClick={this.handleCloseClick}>
                            <IconKeyboardArrowRight />
                        </Button>
                    </div>
                    <PostPreview id={id} basePath="/posts" resource="posts" />
                </Drawer>
            </Fragment>
        );
    }
}

export default connect()(PostQuickPreviewButton);
