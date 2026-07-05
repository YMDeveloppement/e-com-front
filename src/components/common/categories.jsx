import axiosIns from '@/plugins/axiosIns.js'
import { useEffect, useState } from 'react'
import "@/assets/css/mainsection.css"
import { Link, NavLink } from 'react-router-dom';
function LinksNav() {

    let [arr_categories, setArr_categories] = useState([])
    useEffect(() => {
        axiosIns.get('categories').then(res => {
            let dt = Object.values(res.data)
            setArr_categories(dt)
        })
    }, [])

    return (
        <>
            <div className="categorySection accordion" id="mainaccordion">
                <div className="accordion-item" >
                    <h2 className="accordion-header">
                        <button style={{ color: "#030712", fontWeight: "600" }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapsemain`} aria-expanded="true" aria-controls={`flush-collapsemain`}>
                            All categories
                        </button>
                    </h2>
                    <div id={`flush-collapsemain`} className="accordion-collapse collapse show accordion-flush" data-bs-parent="#mainaccordion" style={{  overflow: 'auto' }}>
                        <div className="accordion-body p-0">

                            <div className="accordion accordion-flush" id="accordionExample">
                                {arr_categories.map((item, index) => (
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${index}`} aria-expanded="false" aria-controls={`flush-collapseOne${index}`}>
                                                {item.name}
                                            </button>
                                        </h2>
                                        
                                        {Object.values(item.sub).map((itemSub, indexSub) => (
                                            <div id={`flush-collapseOne${index}`} key={itemSub.slug} className={`accordion-collapse ${index == 0 ? 'show' : ''} collapse` } data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <Link to={`/category/${itemSub.id}`} > <small  className='ps-3'>{itemSub.name}</small> </Link>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}
export default LinksNav