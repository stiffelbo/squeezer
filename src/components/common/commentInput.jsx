import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {strToHex} from '../../utils/generateHex.js'

//MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

//Icons
import PersonIcon from '@mui/icons-material/Person';

//Comp
import PinnToTop from './pinnToTop';
import TinyEditor from './tinyEditor';

class CommentInput extends Component {
    state = { 
        edit : this.props.edit,
        editedContent : this.props.data.content,
    }

    handleModeTogle = value => {
        const {edit} = this.state; 
        if(edit === value){
            this.setState({edit : !value});
        }
    };

    handleEdit = content => {
        const {onEdit, data} = this.props;
        onEdit(data.id, data.type, content);
        this.setState({edit : false, editedContent: content});
    }

    handleDismiss = () => {
        this.setState({edit : !this.state.edit, editedContent : this.props.data.content});
    }

    render() { 
        const {data, user, onPinn, onUnPinn, onDelete, boxStyle} = this.props;
        const {edit} = this.state;
        const isPinned = data['is_pinned'];
        let pinnedStyle = {};
        if(isPinned === '1'){
            pinnedStyle = {
                backgroundColor : '#fffadf',
                padding: "1em",
            }
        };
        const userColor = strToHex(data.username);
        const canEdit = data.id_user == user.id;
        const canDelete = data.id_user == user.id || user.id == 31;
        if(edit){
            return (
                <Card sx={{...boxStyle}} elevation={2}>
                    <CardContent>
                        <Grid container sx={{justifyContent: "space-between"}}>
                            <Grid item md={6} >
                                <Chip icon={<PersonIcon sx={{fill: userColor}}/>} label={data.username} title={data.created_at} />                    
                                <Chip color={'primary'} label={data.type} />
                            </Grid>
                        </Grid>
                        <Grid container fixed>
                            <Grid item md={12} >
                                <TinyEditor value={data.content} onEdit={this.handleEdit} onDismiss={this.handleDismiss}/>
                            </Grid>
                        </Grid>
                    </CardContent>                    
                </Card>
            )
        }else{
            return ( 
                <Card sx={{...boxStyle, ...pinnedStyle}} elevation={2}>
                    <CardContent>
                        <Grid container sx={{justifyContent: "space-between"}}>
                            <Grid item md={4}>
                                <Chip icon={<PersonIcon sx={{fill: userColor}}/>} label={data.username} title={data.created_at} />                                    
                            </Grid>
                            <Grid item md={8} sx={{textAlign: "right"}}>
                                {onPinn && onUnPinn && <PinnToTop id={data.id} isPinned={data.is_pinned} onPinn={onPinn} onUnPinn={onUnPinn} type={data.type}/>}
                                {canEdit && <Chip
                                            label="Edytuj"
                                            onClick={() => this.handleModeTogle(this.state.edit)}
                                            color="default"
                                            variant="filled"
                                        />}
                                {canDelete && <Chip
                                            label="Usuń"
                                            onClick={() => onDelete(data.id, data.type)}
                                            color="secondary"
                                            variant="outlined"
                                        />}
                            </Grid>
                        </Grid>
                        <Grid container sx={{marginTop: '1em', marginLeft: '1em', marginBottom: '1em'}}>
                            <Grid item md={12}>
                                <div dangerouslySetInnerHTML={{ __html: data.content }} style={{...pinnedStyle, fontSize: '16px', padding: '0.5em',  wordBreak: 'break-word', overflow: 'auto'}}></div>
                            </Grid>
                        </Grid>
                    </CardContent>                    
                </Card>
             );
        }
    }
}
 
export default CommentInput;


CommentInput.propTypes = {  
    data: PropTypes.object,
    user: PropTypes.object,
    disabled: PropTypes.array,
    onPinn : PropTypes.func || null,
    onUnPinn : PropTypes.func || null, 
    onDelete : PropTypes.func,
    onEdit : PropTypes.func,
    edit : PropTypes.bool
};

CommentInput.defaultProps = {
    edit : false,
    onPinn : null,
    onUnPinn : null, 
    boxStyle : {width: '100%', margin: '0.3em', padding: '0.3em', marginBottom: '1em', fontSize: '1em', backgroundColor: '#F4F4F4'},
}