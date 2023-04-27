import { useState } from "react";
import {Form, Button, Card, CardGroup, Container, Col, Row, CardProps} from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // validation of user signup
  const handleSubmit = (event) => {
    event.preventDefault(); 

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday};

    fetch("https://radiant-woodland-98669.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.href = '/login';
      } else {
        alert("Signup failed");
      }
    });
  }; 

  // signup form with submit button
  return (
    // handleSubmit is the callback of onSubmit, tells the login API to validate user and password
    <Container>
        <Row>
            <Col>
            <CardGroup>
                <Card>
                    <Card.Header>Welcome to the registration</Card.Header>
            <Form>
        <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
            type="text"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            required
            placeholder="Enter a username"
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
            minLength="8"
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
            type="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
            />
        </Form.Group>
        
        <Form.Group>
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
            type="date"
            value={birthday}
            onChange={e=>setBirthday(e.target.value)}
            />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}> 
            Submit
        </Button>
        </Form>
        </Card>
        </CardGroup>
        </Col>
        </Row>
    </Container>
  );
}; 