import React from 'react';

//Mui
import { Button, IconButton, Grid, Box, Typography, Card, CardHeader, CardContent, Avatar } from '@mui/material';
import { red, blue, orange, purple } from '@mui/material/colors';
//Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//Arrays
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthNamesPL = {
    "January" : "Styczeń",
    "February" : "Luty",
    "March" : "Marzec",
    "April" : "Kwiecień",
    "May" : "Maj",
    "June" : "Czerwiec",
    "July" : "Lipiec",
    "August" : "Sierpień",
    "September" : "Wrzesień",
    "October" : "Październik",
    "November" : "Listopad",
    "December" : "Grudzień"
};

const weekDayNames = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

const MonthCallendar = ({year, month, data = [], rwd = {}, onPrev, onNext, holidays = [], selected = [], onDaySelect, onDropOver, renderDayData}) => {
    //props validation
    if(typeof +year === 'NAN'){
        return (<h1>Błąd w roczniku: {year}</h1>);
    }
    if(typeof +month === 'NAN'){
        return (<h1>Błąd w numerze miesiąca: {year}</h1>);
    }

    //Nazwa miesiaca
    const monthNazwa = monthNamesPL[monthNames[month]];

    //Ilosc dni w danym miesiącu
    const d = (year, month, day = 0) => new Date(year, month, day).getDate();
    const daysInMonth = d(year, month + 1);

    //Pierwszy dzień miesiąca
    const dayOfWeekDate = new Date(year, month, 1);
    const firstDay = dayOfWeekDate.getDay();

    //dzisiaj
    const today = new Date().toLocaleDateString();

    //Nr Tygodnia
    const renderHeader = () => {
        return(
            <Grid container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} spacing={3}>
                <Grid item>
                    <IconButton onClick={()=>onPrev()} >
                        <ArrowBackIosIcon />
                    </IconButton>
                </Grid>
                <Grid item md={2} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Typography variant="h5">
                        {monthNazwa} {year}
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={()=>onNext()} >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    const handleDragOver = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDragEnter = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    
    const handleDragLeave = e => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDrop = (e, data) => {       
        onDropOver(e, data);
    }

    const renderDayCell = (dayOfWeek, dayOfMonth, data = []) => {        
        const dayName = weekDayNames[dayOfWeek];
        const date = new Date(year, month, dayOfMonth).toLocaleDateString();
        const isToday = today === date;
        const inSelected = selected.indexOf(date) > -1 ? true : false;
        const color = dayOfWeek == 0 || holidays.includes(dayOfMonth) ? red[500] : dayOfWeek == 6 ? orange[500] : inSelected ? purple[600] : blue[500];
        return (
            <Card 
                key={date} 
                sx={{width: '98%', backgroundColor : isToday ? orange[100] : 'inherit'}}
                onDragEnter={e=>handleDragEnter(e)} 
                onDragOver={e=>handleDragOver(e)} 
                onDragLeave={e=>handleDragLeave(e)} 
                onDrop={e=>handleDrop(e,date)}
            >
                <CardHeader 
                    avatar={
                        <Avatar sx={{ bgcolor: color, cursor : 'pointer' }} onClick={()=>onDaySelect(date)}>
                          {dayOfMonth}
                        </Avatar>
                      }
                    title={dayName}
                    action={<div>...</div>}
                    
                />
                <CardContent 
                    sx={{minHeight: '6em'}}
                >
                    {renderDayData(data)}
                </CardContent>
            </Card>
        );
    }

    const renderEmptyDay = key => {        
        return (
            <Card key={key} sx={{ width: '98%'}}>
            </Card>
        );
    }

    const renderDayCells = () => {

        const result = [];
        let i = 0;

        let dayOfWeek = (firstDay + i);

        //redner empry cells
        for(let e = 0; e < firstDay; e++){
            result.push(renderEmptyDay(`startday${e}`));
        }

        while(i < daysInMonth){
            const dayOfWeekDate = new Date(year, month, i+1);
            const dayOfWeek = dayOfWeekDate.getDay();
            const dateString = dayOfWeekDate.toLocaleDateString();                    
            const dayData = data[dateString] ? data[dateString] : [];
            result.push(renderDayCell(dayOfWeek, i+1, dayData));
            i++;
        }

        if(dayOfWeek < 7){
            //redner empry cells
            for(let e = 1; e < 6-dayOfWeek; e++){
                result.push(renderEmptyDay(`endday${e}`));
            }
        }

        return result;
    }

    const renderMonthGrid = () => {
        return(
            <Grid container sx={{padding: '0.2em', display: 'grid', gridTemplateColumns: '0.7fr 1fr 1fr 1fr 1fr 1fr 0.7fr'}} >
                    {renderDayCells()}
            </Grid>           
        );
    }
    return ( <Box sx={{maxWidth : '100%', overflowX: 'scroll', marginRight : '0.5em'}}>
            <Box sx={{minWidth: `${rwd.width * 0.7}px`, width: '100%'}}>
                {renderHeader()}
                {renderMonthGrid()}        
            </Box>
    </Box> );
}
 
export default MonthCallendar;