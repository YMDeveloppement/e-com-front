import axiosIns from "@/plugins/axiosIns"

async function getHomeData() {
    let data_catg_slider = await getDataSlider()
    console.log("data_catg_slider", data_catg_slider)
    return { 'data_catg_slider': data_catg_slider }
}

async function getDataSlider() {
    const { data } = await axiosIns.get('/home')
    return data
}

// export { getHomeData, getDataSlider }
export default getHomeData