import React, { Component } from 'react';
import {url} from '../../config';

import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

//Icons
import DesignServicesIcon from '@mui/icons-material/DesignServices';

//common
import AsanaSlug from './asanaSlug';

class DesignsCards extends Component {
    constructor(props) {
        super(props);
    
        this._isMounted = false;
        this.state = { 
            designs: [],
            loading : true,
        } 
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        const {id, getDesigns} = this.props;
        this._isMounted = true;
        const {data} = await getDesigns(id);
        this._isMounted && this.setState({designs : data, loading: false});        
    }

    async componentDidUpdate(prevProps, prevState) {
        const {id, getDesigns} = this.props;
        if(prevState.designs !== this.state.designs){
            this.render();
        }
        if(prevProps.id !== id){
            this.setState({loading: true});
            const {data} = await getDesigns(id);
            this._isMounted && this.setState({designs : data, loading : false});
        }
    }

    renderCard = item => {
        const {onSelect, secondary} = this.props;
        let image = <div>
                        <CardHeader 
                            subheader="in progress.."
                        />
                        <CardMedia
                            component="div"
                            width='100%'
                            sx={{padding: '8px'}}
                        >
                            <ModelTrainingIcon sx={{width: '100%', height: '150px'}}/>
                        </CardMedia>
                    </div>;
        
        if(item.name && item.is_pinned === "1"){
            image = <div style={{maxHeight: '300px'}}><CardMedia
                        component="img"
                        image={url + "Public/DesignFiles/" + item.id + "/wizualizacja" + "/" + item.name }
                        alt={item.asana}
                        sx={{padding: '8px', height: '100%', width: 'auto', maxWidth: '100%'}}
                    /></div>
            }
        return(
            <Grid key={item.id} item md={4}>
                <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection : 'column', justifyContent: 'space-between'}}>
                    {image}
                    <div style={{padding: '0.75em'}}>
                        <div>
                            <AsanaSlug slug={item.asana} />
                        </div>                        
                        <h5>{item.client}</h5>
                        <div>
                            <Link to={'/gem/design/'} >
                                <Button 
                                    size="small" 
                                    color="primary" 
                                    onClick={ () => onSelect(item.id)}
                                    startIcon={<DesignServicesIcon/>}
                                    title="Link Design"
                                >{item.id}</Button>
                            </Link>
                            {secondary.allowed && <Link to={secondary.path} >
                                <Button 
                                    size="small" 
                                    color="primary" 
                                    onClick={ () => secondary.callBack(item[secondary.prop])}
                                    startIcon={secondary.icon}
                                >{secondary.title}</Button>
                            </Link>}
                        </div>                        
                    </div>
                </Card>
            </Grid>                
        )
    }


    renderNoDesigns = () => {
        return (<Grid item md={12}><h1 style={{width: '100%', textAlign: 'center'}}>No designs</h1></Grid>);
    }
    renderLoading = () => {
        return (<Grid item md={12}><h1 style={{width: '100%', textAlign: 'center'}}>Pobieram...</h1></Grid>);
    }

    uniqueDesigns = () => {
        const {designs} = this.state;
        const uniqueIDs = [];
        const uniqueItems = [];
        designs && designs.map(item => {
            if(uniqueIDs.indexOf(item.id) === -1){
                uniqueIDs.push(item.id);
                uniqueItems.push(item);
            }
        });
        return uniqueItems;
    }

    render() { 
        const {loading} = this.state;
        const {rwd} = this.props;
        const height = `${rwd.height - 222}px`;
        return (
            <Box sx={{width: '100%', height, maxHeight: height, overflowY: 'scroll'}}>
                <Grid container spacing={1}>
                        {loading && this.renderLoading()}
                        {!loading && this.uniqueDesigns() && this.uniqueDesigns().map(item => this.renderCard(item))}
                        {!loading && !this.uniqueDesigns().length && this.renderNoDesigns()}                   
                </Grid>
            </Box>            
        );
    }
}
 
export default DesignsCards;