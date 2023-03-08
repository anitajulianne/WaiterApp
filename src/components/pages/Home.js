import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const Home = () => {

    const tables = useSelector(getAllTables);

    return (
        <div className="my-3">
            <h1>All Tables</h1>
            <ListGroup variant="flush">
                { tables.map(table =>(
                    <ListGroup.Item className="px-0">
                        <Stack direction="horizontal" gap={3}>
                            <h3>Table {table.id}</h3>
                            <p className="my-1"><strong>Status:</strong> {table.status}</p>
                            <Link className="ms-auto" to={`/table/${table.id}`}>
                                <Button variant="primary">Show more</Button>
                            </Link>
                        </Stack>
                    </ListGroup.Item>))}
            </ListGroup>
        </div>
    )
}

export default Home;