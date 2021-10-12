import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { red, green } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        paddingTop: '56.25%', // 16:9
        height: 80
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
        backgroundColor: props => props.condition === 'used' ? red[500] : green[500],
    },
    price: {
        textAlign: "right"
    },
    stock: {

    },
    footer: {
        marginTop: "12px"
    }
}));

export default function ProductCard({ condition, price, title, stock, currency, imageUrl }) {
    const classes = useStyles({ condition });

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {condition.slice(0, 1).toUpperCase()}
                    </Avatar>
                }

                title={title}
                subheader={condition === 'new' ? 'Nuevo' : 'Usado'}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
                title=""
            />
            <CardContent>
                <Grid container className={classes.footer}>
                    <Grid item xs={6} className={classes.stock}>
                        Stock: {stock}
                    </Grid>
                    <Grid item xs={6} className={classes.price}>
                        {currency} {price.toFixed(2)}
                    </Grid>

                </Grid>

            </CardContent>

        </Card>
    );
}
