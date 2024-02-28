import { Button, Col, Row, Table } from "reactstrap"
import { School } from "../interfaces/entities"



interface ListProps {
    schools:  School[]
    showMore: (school_name: string) => void
    prev: () => void;
    next: () => void
}

const List: React.FC<ListProps> = ({schools, showMore, prev, next}) => {
    return (
        <Row>
            <Col>
              <Table bordered>
                <thead>
                    <tr>
                        <th>School Name</th>
                        <th>DBN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schools.map((item: School) => (
                            <tr key={item.school_name}>
                                <td>{item.school_name}</td>
                                <td>{item.dbn}</td>
                                <td><Button onClick={()=>showMore(item.school_name)}>Show more</Button></td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <div className="d-flex">
                        <Button onClick={prev}>Prev</Button>
                        <Button onClick={next}>Next</Button>
                    </div>
                </tfoot>
              </Table>
            </Col>
        </Row>
    )
}

export default List