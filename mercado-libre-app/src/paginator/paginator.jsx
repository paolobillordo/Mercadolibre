import { Box, Button, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    previous: { textAlign: 'right' },
    centered: {textAlign: 'center'}
}));


export default function Paginator({total, page, onPageChange}) {
    const classes = useStyles()


    return (

        <Box pt={3}>
            <Grid container>
                <Grid item xs={5} className={classes.previous}>
                    <Button color="primary" disabled={page === 1} onClick={e=> onPageChange(page-1)}>Anterior</Button>
                </Grid>
                <Grid container item xs={2} className={classes.centered}>
                    <Grid item xs={12}>
                        <Button color="primary">{page}</Button>
                    </Grid>                   
                </Grid>
                <Grid item xs={5}>
                    <Button color="primary" disabled={(page+1)*30 > total} onClick={e=> onPageChange(page+1)}>Siguiente</Button>
                </Grid>
            </Grid>
        </Box>
    )

}