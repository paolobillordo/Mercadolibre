import { Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import ProductCard from "../product.card/productCard";
import axios from "axios";
import Paginator from "../paginator/paginator";



export default function Catalogue({term, filter, sort}) {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)


    useEffect(async () => {
        if (term && term !== "") {
            const call = await axios.get(`http://localhost:4000/api/search?q=${term}&filter=${filter}&sort=${sort}&page=${page}`)
            setProducts(call.data.results)
            console.log(call.data.results)
            setTotal(call.data.paging.total)
            window.scrollTo({top:0, behavior:'smooth'})
        }
    }, [term, filter, sort, page])

    useEffect(() => {
        setPage(1)
    },[term, filter, sort])
    return (

        <Box m={3} pt={6}>
            <Grid container>
                {products.map(p =>
                    <Grid item xs={4}>
                        <Box m={1.5}>
                        <ProductCard 
                            condition={p.condition}
                            title={p.title}
                            price={p.price}
                            imageUrl={p.thumbnail}
                            stock={p.available_quantity}
                            currency={p.currency_id}></ProductCard>
                            </Box>
                    </Grid>)}
                    {products.length > 0 && <Grid item xs={12}>
                        <Paginator total={total} page={page} onPageChange={e=> setPage(e)} />

                    </Grid>}
            </Grid>

        </Box>
    )
}