import { useState } from "react";
import { Card, Col, Form, Button, Row } from "react-bootstrap";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {

    console.log("User ", user)
    console.log("Movie ", movies)

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthdate, setBirthdate] = useState(user.Birthday);

    let favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

    
    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthdate
        }

        fetch(`https://radiant-woodland-98669.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Changing userdata failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully changed userdata");
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const deleteAccount = () => {
        fetch(`https://radiant-woodland-98669.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.ok) {
                alert("Your account has been deleted. Good Bye!");
                onLoggedOut();
            } else {
                alert("Could not delete account");
            }
        })
        .catch(e => {
            alert(e);
        });
    }


    return (
        <>
        <Row>
            <Col md={6}>           
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title >Your info</Card.Title>
                        <p>Username: {user.Username}</p>
                        <p>Email: {user.Email}</p>
                        <p>Birthdate: {user.Birthday}</p>
                    </Card.Body>
                </Card>
                <Button variant="danger" onClick={() => {
                    if (confirm("Are you sure?")) {
                        deleteAccount();
                    }
                }}>Delete user account</Button>
            </Col>
            <Col md={6}>
                <Card className="mt-2 mb-3">
                    <Card.Body>
                        <Card.Title>Update your info</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                    minLength="5"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    minLength="4"
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthdate:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthdate}
                                    onChange={e => setBirthdate(e.target.value)}
                                    required
                                    className="bg-light"
                                />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
            <Row>
            <Col md={12}>
                <h3 className="mt-3 mb-3 text-dark">Your favorite movies:</h3>
            </Col>
            {favoriteMovies.map(movie => (
           
                <MovieCard movie={movie} />
            
             ))}
            </Row>
        </>
    );
}