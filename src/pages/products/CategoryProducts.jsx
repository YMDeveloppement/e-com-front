import axiosIns from '@/plugins/axiosIns.js'
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CardProduct from '@/components/common/cardproduct/cardproduct'
import FilterProducts from '@/components/common/filters/FilterProducts.jsx';
import "@/assets/css/pages/productcategory.scss"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function CategoryProducts() {

    const { id } = useParams();
    let [products, setProducts] = useState([])
    let [title, setTitle] = useState([])
    let [filterdata, setFilterData] = useState([])
    let [pagination, setPagination] = useState([])
    let [page, setPage] = useState(1)
    const paginateData = (event, value) => {
        setPage(value)
        console.log(value);
        let filterStorage = JSON.parse(localStorage.getItem('filter'))
        getData(filterStorage, value)
        console.log(value , filterStorage);
    };

    const getData = (filteringValues = null  , page = 1) => {
        
        axiosIns.get(`product_category/${id}`, {
            params: { ...filteringValues, 'page': page }
        })
            .then(({ data }) => {
                console.log({ ...page })
                setProducts(Object.values(data.products))
                setTitle(data.title)
                setFilterData(data.filter_data)
                setPagination(data.pagination)
            }).catch((ex) => {
            })
    }

    useEffect(() => {
        getData()
    }, [id])

    return (
        <>
            <div className="product-categories">
                <div className="row">
                    <div className='col-3 pa-3 '>
                        <FilterProducts onRefresh={getData} filterData={filterdata} />
                    </div>
                    <div className='listing-prdt col-9'>

                        <div className="d-flex justify-content-between gap-2">
                            <h4 className='title-catg '>{title}</h4>
                            <div className="pagination-container d-flex justify-content-end pt-2 pb-4">

                                <Stack spacing={1}>
                                    <Pagination page={page} onChange={paginateData} count={pagination.count_pages} variant="outlined" />
                                </Stack>

                            </div>
                        </div>
                        <div className="prod-container d-flex g-1 p-1 justify-content-start" >
                            {products.map((ele, index) => {
                                return (
                                    <CardProduct className="border-card" key={index} item={ele} />
                                )
                            })}
                        </div>
                        <div className="pagination-container d-flex justify-content-end pb-4">

                            <Stack spacing={1}>
                                <Pagination page={page} onChange={paginateData} count={pagination.count_pages} variant="outlined" />
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}