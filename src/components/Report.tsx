import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Stack, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { generate, data } from '../reducers/reportSlice';
import styles from './Report.module.css';
import { Result } from './Result';

export function Report() {
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const mapData = useSelector(data);

  useEffect(() => {
    const url = 'https://mapon.com/api/v1/unit/list.json';
    const apiKey = '93737a19206c2d71d26360187d64ac0fc6656621';

    fetch(`${url}?key=${apiKey}`)
      .then(response => response.json())
      .then(data => setVehicles(data.data.units));
  }, []);

  return (
    <Container className={`${styles.container} mt-5 p-0`}>
      <header className="p-4 fs-2">Route report</header>
      <Form className="p-4">
        <Stack gap={4}>
          <Form.Group as={Row} className="mb-3" controlId="vehicleNumber">
            <Form.Label column sm="2">
              Vehicle number
            </Form.Label>
            <Col sm="10">
              <Form.Select
                onChange={e => setSelectedVehicleId(e.target.value)}
              >
                {vehicles.map(vehicle => (
                  <option key={vehicle.unit_id} value={vehicle.unit_id}>{vehicle.number}</option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Period
            </Form.Label>
            <Col sm="10">
              <Row>
                <Col>
                  <Form.Label column sm="2">
                    From
                  </Form.Label>
                  <Form.Control as={DatePicker} selected={dateFrom} onChange={date => setDateFrom(date)} />
                </Col>
                <Col>
                  <Form.Label column sm="2">
                    To
                  </Form.Label>
                  <Form.Control as={DatePicker} selected={dateTo} onChange={date => setDateTo(date)} />
                </Col>
              </Row>
            </Col>
          </Form.Group>
        </Stack>
      </Form>
      {mapData.show &&
        <Result
          vehicleId={selectedVehicleId}
          dateFrom={dateFrom.toISOString().split('.')[0]+'Z'}
          dateTo={dateTo.toISOString().split('.')[0]+'Z'}
        />
      }
      <footer className={`${styles.footer} p-4`}>
        <Stack direction="horizontal" className="justify-content-end">
          <Button type="submit" variant="primary" className={styles.generate} onClick={() => dispatch(generate())}>GENERATE</Button>
        </Stack>
      </footer>
    </Container>
  );
}
