import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux'


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
                            <a class="btn btn-primary ms-auto" href={`/table/${table.id}`} role="button">Show more</a>
                        </Stack>
                    </ListGroup.Item>))}
            </ListGroup>
        </div>
    )
}

export default Home;