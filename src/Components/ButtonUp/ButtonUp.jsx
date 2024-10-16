import ScrollToTop from 'react-scroll-to-top'

export default function ButtonUp() {
    return <>
        <ScrollToTop className='bg-main text-white rounded bottom-0 end-0 me-3 mb-3'
            smooth
            top = {1500}
            component={<i className="fa-solid fa-arrow-up"></i>}>
        </ScrollToTop>
    </>
}
