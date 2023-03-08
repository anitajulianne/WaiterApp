import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getTableById, updateTableRequest, getAllTables } from '../../redux/tablesRedux';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const Table = () => {

    const { id } = useParams();
    const tableData = useSelector(state => getTableById(state, id));
    const tables = useSelector(getAllTables);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = ['Free', 'Busy', 'Reserved', 'Cleaning'];
    const [status, setStatus] = useState(tableData?.status);
    const [people, setPeople] = useState(tableData?.peopleAmount);
    const [maxPeople, setMaxPeople] = useState(tableData?.maxPeopleAmount);
    const [bill, setBill] = useState(tableData?.bill);
    
    useEffect(() => {
        if (tableData) {
          setStatus(tableData.status);
          setBill(tableData.bill);
          setPeople(tableData.peopleAmount);
          setMaxPeople(tableData.maxPeopleAmount);
        }
      }, [tableData]);

      useEffect(() => {
        
        if(status === 'Cleaning' || status === 'Free'){
          setPeople(0);
        } else if(status === 'Busy') {
            setBill(0);
        } else if(people > maxPeople) {
          setPeople(setMaxPeople);
        }
      }, [status, people, maxPeople]);
      

      const submit = (e) => {
        e.preventDefault();
        dispatch(updateTableRequest(id, { status, bill, peopleAmount: people, maxPeopleAmount: maxPeople }));
        navigate("/");
      }
    
      if (!tableData) {
		for (let table of tables) {
			if (table.id !== id) {
				return <Navigate to='/' />;
			}
		}
		return (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span> </Spinner>
          );
	}

    if(tableData){
        return (
            <div className="my-3">
                <h1>Table { id }</h1>
                <Form onSubmit={ submit }>

                    <Form.Group className="my-4" >
                        <Row>
                            <Form.Label  className="col-1 my-2" ><strong>Status:</strong></Form.Label>
                            <Col className="col-3">
                                <Form.Select id="disabledSelect" value={ status } onChange={(e) => setStatus(e.target.value)}>
                                    {options.map((value) => (<option value={value} key={value}>{value}</option>))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group >
                        <Row className="mb-3">
                            <Stack direction="horizontal" gap={3}>
                                <Form.Label  className="col-1 my-2" ><strong>People:</strong></Form.Label>
                                <Col className="col-1" >
                                    <Form.Control type="number" value={ people } min="0" max={ maxPeople } onChange={(e) => setPeople(e.target.value)} />
                                </Col>
                                /
                                <Col className="col-1" >
                                    <Form.Control type="number" value={ maxPeople } min="0" max="10" onChange={(e) => setMaxPeople(e.target.value)} />
                                </Col>
                            </Stack>
                        </Row>
                    </Form.Group>

                    <Form.Group className={status !== 'Busy' ? "d-none" : "my-3"}>
                        <Row className="mb-3">
                            <Stack direction="horizontal" gap={3}>
                                <Form.Label  className="col-1 my-2" ><strong>Bill:</strong></Form.Label>
                                $
                                <Col className="col-1" >
                                    <Form.Control type="number" value={ bill } onChange={(e) => setBill(e.target.value)} />
                                </Col>
                            </Stack>
                        </Row>
                    </Form.Group>

                    <Button variant="primary" type="submit">Update</Button>
    
                </Form>
            </div>
        )
    }
}

export default Table;