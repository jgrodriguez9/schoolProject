import { useCallback, useEffect, useMemo, useState } from "react"
import { Col, Container, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap"
import { School } from "../interfaces/entities"
import List from "../components/List"

const Home: React.FC = () => {
    const [loader, setLoader] = useState(false)
    const [schools, setSchools] = useState<School[] | []>([])
    const [detail, setDetail] = useState<School | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1)



    useEffect(() => {
        const getSchoolListApi = async () => {
            setLoader(true)
            try {
                const response = await fetch('https://data.cityofnewyork.us/resource/s3k6-pzi2.json')
                const result = await response.json()
                setSchools(result.map((it: School)=>({school_name: it.school_name, dbn: it.dbn, overview_paragraph: it.overview_paragraph})))
                setLoader(false)
            } catch (error) {
                // placeholder error handle
            }
        }
        getSchoolListApi()
    },[])


    const showMore = useCallback((school_name: string) => {
        const selected = schools.find(it=>it.school_name === school_name)
        setDetail(selected ?? null)
        setShowModal(true)
    },[schools])

    const toggle = () => setShowModal(!showModal)

    const schoolsSlices = useMemo(() => {
        if(schools.length > 0) {
            const first = (currentPage -1 ) * 10
            const last = currentPage * 10
            return schools.slice(first, last)
        }
        return []
    },[schools, currentPage])

    const prev = () => {
        if(currentPage === 1) return;
        setCurrentPage(currentPage-1)
    }
    const next = () => {
        setCurrentPage(currentPage+1)
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}><h1>School</h1></Col>
                {loader && <Spinner color="primary" />}
                {!loader && <Col xs={12} md={12}>
                    <List schools={schoolsSlices} showMore={showMore} prev={prev} next={next}/>
                </Col>}
            </Row>
            <Modal isOpen={showModal} toggle={toggle}>
                <ModalHeader>School detail</ModalHeader>
                <ModalBody>
                    {
                        detail ? detail.overview_paragraph : 'No info available'
                    }
                </ModalBody>
            </Modal>
            
        </Container>
    )
}

export default Home