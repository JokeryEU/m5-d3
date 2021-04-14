import React from "react";
import {
  Col,
  Row,
  //   Card,
  Container,
  ListGroup,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { TiDeleteOutline } from "react-icons/ti";
import { RiEditFill } from "react-icons/ri";
import moment from "moment";
// import Adv from "./Adv";
import "./styles/profile.css";

class students extends React.Component {
  state = {
    imgModal: false,
    show: false,
    file: null,
    myProfile: [],
    relatedProfiles: [],
    suggestedProfiles: [],
    experiences: [],
    items: [
      "item",
      "item",
      "item",
      "item",
      "item",
      "item",
      "item",
      "item",
      "item",
    ],
    body: {
      name: "",
      surname: "",
      email: "",
      dateofbirth: "",
    },
  };

  componentDidMount = async () => {
    // await this.fetchMe();

    // await this.catchThemAll();
    await this.getExp();
  };
  fetchDataAndShowModal = (id) => {
    this.handleShow();
    this.getExp(id);
  };

  editExp = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/students/` + id, {
        method: "PUT",
        body: JSON.stringify(this.state.body),
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Student info edited");
        this.getExp();
        this.setState({
          body: { name: "", surname: "", email: "", dateofbirth: "", id: "" },
        });
      } else {
        alert("You failed this edit");
      }
    } catch (error) {
      console.log(error);
    }
  };
  deleteItem = async (id) => {
    try {
      let response = await fetch(`http://localhost:3001/students/` + id, {
        method: "DELETE",
        // headers: {
        //   Authorization: "Bearer " + localStorage.getItem("token"),
        // },
      });
      if (response.ok) {
        alert("Student info deleted");
        this.getExp();
      } else {
        alert("Error in the delete process");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   catchThemAll = async () => {
  //     try {
  //       let response = await fetch(
  //         "https://striveschool-api.herokuapp.com/api/profile/",
  //         {
  //           headers: {
  //             // Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         let allProfiles = await response.json();
  //         this.setState({ relatedProfiles: allProfiles.slice(95, 100) });
  //         this.setState({ suggestedProfiles: allProfiles.slice(100, 105) });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchMe = async () => {
  //     const url =
  //       "https://striveschool-api.herokuapp.com/api/profile/" +
  //       this.props.match.params.id;
  //     // const url =
  //     //   this.props.match.params.id === "me"
  //     //     ? "https://striveschool-api.herokuapp.com/api/profile/me"
  //     //     : "https://striveschool-api.herokuapp.com/api/profile/"+this.props.match.params.id;
  //     try {
  //       let response = await fetch(url, {
  //         headers: {
  //           //   Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       });
  //       if (response.ok) {
  //         let myProfile = await response.json();
  //         this.setState({ myProfile });
  //         console.log(this.state.myProfile);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  getExp = async (id) => {
    try {
      if (id) {
        let response = await fetch(`http://localhost:3001/students/` + id, {
          headers: {
            //   Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          let data = await response.json();
          // this.setState({ experiences: data });

          this.setState({
            body: data,
          });
          console.log(this.state.body);
        }
      } else {
        let response = await fetch(`http://localhost:3001/students/`, {
          headers: {
            //   Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          let data = await response.json();
          this.setState({ experiences: data });
          console.log(this.state.experiences);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  uploadExpPic = async (id) => {
    console.log(this.state.file);
    if (this.state.file === null) {
      console.log("No image or file added");
    } else {
      let image = new FormData();
      image.append("experience", this.state.file);

      try {
        const response = await fetch(`http://localhost:3001/students/${id}`, {
          method: "POST",
          body: image,
          headers: {
            //   Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          console.log("Experience pic added");
          this.setState({ file: null });
        } else {
          console.log("Error while adding the pic");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.setState({ myProfile: [] });
  //     this.fetchMe();
  //     this.getExp();
  //   }
  // }

  handleProfile = (id) => {
    // this.props.history.push("/user/" + id);
    window.location.assign("/user/" + id);
  };
  updateProPic = () => {
    this.setState({ imgModal: true });
  };
  fetchDataAndShowModal = (id) => {
    this.handleShow();
    this.getExp(id);
  };
  sendingEditedExpAndPic = (id) => {
    this.editExp(id);
    this.uploadExpPic(id);
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  onHide = () => {
    this.setState({ show: false });
    this.setState({ body: {} });
  };
  postExp = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3001/students/`, {
        method: "POST",
        body: JSON.stringify(this.state.body),
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Student info ADDED");
        this.getExp();
        this.setState({
          body: { name: "", surname: "", email: "", dateofbirth: "" },
        });
      } else {
        alert("You failed this add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md={9} style={{ marginTop: "5vh" }}>
            {/* <Card>
              <Card.Img
                variant="top"
                src="https://coverfiles.alphacoders.com/372/37275.jpg"
                style={{ objectFit: "cover" }}
                alt="placeholder"
              />
              <Card.Body>
                <div>
                  <div style={{ marginTop: "-130px" }}>
                    <img
                      onClick={this.updateProPic}
                      src={
                        this.state.myProfile.image
                          ? this.state.myProfile.image
                          : "https://mir-s3-cdn-cf.behance.net/project_modules/disp/afb8cb36197347.5713616457ee5.gif"
                      }
                      alt="placeholder"
                      height="160px"
                      width="160px"
                      style={{
                        borderRadius: "50%",
                        border: "4px solid white",
                        objectFit: "cover",
                      }}
                    ></img>
                  </div>
                </div>

                <Card.Text>
                  <Row>
                    <Col xs={12}>
                      {this.state.myProfile.name} {this.state.myProfile.surname}
                    </Col>
                    <Col xs={12}>{this.state.myProfile.bio} </Col>
                    <Col xs={12}>{this.state.myProfile.area}</Col>
                    <Col xs={12}>
                      <p>42 connections</p> <p> Contact info</p>
                    </Col>
                    <Col style={{ display: "flex" }} xs={4} md={12}>
                      <div>
                        <button className="pButton openToButton">
                          Open to
                        </button>
                        <button className="pButton greyButton">
                          Add profile section
                        </button>
                        <button className="greyButton">More...</button>
                      </div>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card> */}
            <div className="students">
              <h3>Students</h3>
              <div>
                <Row>
                  <Col className="alignToTheRight" xs={12}>
                    <img
                      onClick={() => this.handleShow()}
                      height={40}
                      alt="plus-ico"
                      src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/plus-512.png"
                    />
                  </Col>
                </Row>
              </div>

              {this.state.experiences.map((experience) => (
                <div className="mt-3 " key={experience.id}>
                  <div className="experienceContainer rope">
                    {/* <img src={experience.image} alt="No pic added" /> */}
                    <div>
                      <div className="stick">
                        <strong>
                          {experience.name} {experience.surname}
                        </strong>
                      </div>
                      <div>{experience.email}</div>
                    </div>
                    <div className="text-muted dates">
                      <h6 style={{ color: "black" }}>Birthday</h6>
                      {moment(experience.dateofbirth).format("Do MMMM YYYY")}
                      {/* {" "} */}
                      {/* <h6 style={{ color: "black" }}>To:</h6>{" "}
                        {moment(experience.endDate).format("Do MMMM YYYY")} */}
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          this.fetchDataAndShowModal(experience.id)
                        }
                        className="editButton"
                      >
                        <RiEditFill />
                      </button>
                      <button
                        className="delButton"
                        onClick={() => this.deleteItem(experience.id)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
          <Col
            md={3}
            style={{ marginTop: "5vh" }}
            className="d-none d-md-block"
          >
            {/* <ListGroup style={{ width: "299px" }}>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup> */}
            <div style={{ marginTop: "20px" }}>{/* <Adv /> */}</div>
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "white",
                width: "299px",
              }}
            >
              <div>
                <ListGroup>
                  {this.state.relatedProfiles.length > 0 &&
                    this.state.relatedProfiles.map((user) => {
                      return (
                        <div
                          onClick={() => this.handleProfile(user._id)}
                          style={{ width: "299px" }}
                          className="proPic"
                        >
                          <img height={40} src={user.image} alt={user._id} />
                          <p>
                            {user.name} {user.surname}
                          </p>
                        </div>
                      );
                    })}
                </ListGroup>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "white",
                width: "299px",
              }}
            >
              <div>
                {/* <ListGroup>
                  {this.state.suggestedProfiles.length > 0 &&
                    this.state.suggestedProfiles.map((user) => {
                      return (
                        <div
                          style={{ width: "299px" }}
                          key={user._id}
                          className="proPic"
                        >
                          <img
                            height={40}
                            src={user.image}
                            alt="user profile image"
                          />
                          <p>
                            {user.name} {user.surname}
                          </p>
                        </div>
                      );
                    })}
                </ListGroup> */}
              </div>
            </div>
          </Col>
        </Row>

        <Modal show={this.state.show}>
          <Modal.Header closeButton={this.onHide}>
            <Modal.Title>
              {this.state.body.id ? "Edit " : "Add "}Student
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    this.setState({
                      body: {
                        ...this.state.body,
                        name: e.target.value,
                      },
                    })
                  }
                  value={this.state.body.name}
                  type="text"
                  placeholder="name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    this.setState({
                      body: { ...this.state.body, surname: e.target.value },
                    })
                  }
                  value={this.state.body.surname}
                  type="text"
                  placeholder="surname"
                />
              </Form.Group>
              <Row>
                <Col>
                  <label> Date of birth</label>
                  <input
                    required
                    onChange={(e) =>
                      this.setState({
                        body: {
                          ...this.state.body,
                          dateofbirth: e.target.value,
                        },
                      })
                    }
                    value={this.state.body.dateofbirth}
                    type="date"
                  />
                </Col>
                {/* <Col>
                  <label>End Date</label>
                  <input
                    onChange={(e) =>
                      this.setState({
                        body: { ...this.state.body, endDate: e.target.value },
                      })
                    }
                    value={this.state.body.endDate}
                    type="date"
                  />
                </Col> */}
              </Row>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  onChange={(e) =>
                    this.setState({
                      body: { ...this.state.body, email: e.target.value },
                    })
                  }
                  value={this.state.body.email}
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
              {/* <Form.Group>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      body: { ...this.state.body, area: e.target.value },
                    })
                  }
                  value={this.state.body.area}
                  type="text"
                  placeholder="area"
                />
              </Form.Group> */}
              {/* <Form.Group>
                <Form.File
                  onChange={(e) =>
                    this.setState({
                      ...this.state.file,
                      file: e.target.files[0],
                    })
                  }
                  id="image upload"
                  label="Upload image"
                />
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.onHide()}>
              Close
            </Button>
            {this.state.body.id ? (
              <div></div>
            ) : (
              <Button variant="primary" onClick={(e) => this.postExp(e)}>
                Save
              </Button>
            )}
            {this.state.body.id ? (
              <Button
                variant="primary"
                onClick={() => this.sendingEditedExpAndPic(this.state.body.id)}
              >
                Edit
              </Button>
            ) : (
              <div></div>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
export default students;
