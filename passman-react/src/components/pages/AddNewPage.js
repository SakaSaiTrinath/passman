import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Row,
	Col,
	Container
} from "reactstrap";
import NavBar from "../navs/NavBar";
import { addDoc, updateDoc } from "../../actions/docs";

const getInitialState = props =>
	props.curdoc === undefined
		? {
				dname: "",
				username: "",
				email: "",
				password: "",
				tags: { tag0: "", tag1: "", tag2: "" },
				link: ""
		  }
		: {
				dname: props.curdoc[0].dname,
				username: props.curdoc[0].username,
				email: props.curdoc[0].email,
				password: props.curdoc[0].password,
				tags: {
					tag0: props.curdoc[0].tags[0],
					tag1: props.curdoc[0].tags[1],
					tag2: props.curdoc[0].tags[2]
				},
				link: props.curdoc[0].link
		  };

class AddNewPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: getInitialState(this.props),
			redirect: false,
			errors: {}
		};
	}

	handleChange = async event => {
		const { name, value } = event.target;
		await this.setState({
			data: { ...this.state.data, [name]: value }
		});
	};

	handleTagChange = async event => {
		const { name, value } = event.target;
		await this.setState({
			data: {
				...this.state.data,
				tags: { ...this.state.data.tags, [name]: value }
			}
		});
	};

	validateFields = data => {
		const errors = {};
		if (!data.dname) errors.dname = "Can't be blank!";
		if (!data.username) errors.username = "Username needed!";
		if (!data.email) errors.email = "Can't be blank!";
		if (!data.password) errors.password = "Can't be blank!";
		if (!data.link) errors.link = "Can't be blank!";
		return errors;
	};

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validateFields(this.state.data);
		this.setState({
			errors
		});

		if (Object.keys(errors).length === 0) {
			if (this.props.curdoc) {
				this.props
					.updateDoc(this.state.data)
					.then(() => {
						alert("Record updated successfully...");
						this.setState({ redirect: true });
					})
					.catch(err => {
						this.setState({
							errors: err
						});
					});
			} else {
				this.props
					.addDoc(this.state.data)
					.then(() => {
						alert("Record added successfully...");
						this.setState({ redirect: true });
					})
					.catch(err => {
						this.setState({
							errors: err.response.data.errors
						});
					});
			}
		}
		if (this.state.errors.dname) {
			this.setState({
				data: {
					dname: ""
				}
			});
		}
		if (this.state.errors.username) {
			this.setState({
				data: {
					username: ""
				}
			});
		}
		if (this.state.errors.email) {
			this.setState({
				data: {
					email: ""
				}
			});
		}
		if (this.state.errors.password) {
			this.setState({
				data: {
					password: ""
				}
			});
		}
		if (this.state.errors.link) {
			this.setState({
				data: {
					link: ""
				}
			});
		}
	};

	render() {
		const { dname, username, email, password, link } = this.state.data;
		const { tag0, tag1, tag2 } = this.state.data.tags;

		// It will redirect to view all page when record added or updated
		if (this.state.redirect) {
			return <Redirect to="/all" />;
		}

		return (
			<div className="Container">
				<NavBar />
				<Container>
					<Row>
						<Col>
							<h3
								style={{
									textAlign: "center",
									marginTop: "15px"
								}}
							>
								{this.props.curdoc
									? `Edit ${this.state.data.dname} doc`
									: `Add new doc`}
							</h3>
							<Container>
								<Row
									style={{
										marginTop: "20px"
									}}
								>
									<Col
										className="searchbox"
										sm="12"
										md={{ size: 6, offset: 3 }}
										style={{ border: "1px solid black" }}
									>
										<Form onSubmit={e => this.onSubmit(e)}>
											{!!this.state.errors.global && (
												<p style={{ color: "red" }}>
													{this.state.errors.global}
												</p>
											)}
											<FormGroup>
												<Input
													type="text"
													name="dname"
													id="dname"
													value={dname}
													placeholder="example site"
													invalid={
														!!this.state.errors
															.dname
													}
													onChange={this.handleChange}
												/>
											</FormGroup>
											{!!this.state.errors.dname && (
												<p style={{ color: "red" }}>
													{this.state.errors.dname}
												</p>
											)}

											<Row>
												<Col md={6}>
													<FormGroup>
														<Input
															type="text"
															name="username"
															id="username"
															value={username}
															placeholder="example123"
															invalid={
																!!this.state
																	.errors
																	.username
															}
															onChange={
																this
																	.handleChange
															}
														/>
													</FormGroup>
													{!!this.state.errors
														.username && (
														<p
															style={{
																color: "red"
															}}
														>
															{
																this.state
																	.errors
																	.username
															}
														</p>
													)}
												</Col>
												<Col md={6}>
													<FormGroup>
														<Input
															type="email"
															name="email"
															id="email"
															value={email}
															placeholder="email@email.com"
															invalid={
																!!this.state
																	.errors
																	.email
															}
															onChange={
																this
																	.handleChange
															}
														/>
													</FormGroup>
													{!!this.state.errors
														.email && (
														<p
															style={{
																color: "red"
															}}
														>
															{
																this.state
																	.errors
																	.email
															}
														</p>
													)}
												</Col>
											</Row>

											<FormGroup>
												<Input
													type="text"
													name="password"
													id="password"
													value={password}
													placeholder="********"
													invalid={
														!!this.state.errors
															.password
													}
													onChange={this.handleChange}
												/>
											</FormGroup>
											{!!this.state.errors.password && (
												<p style={{ color: "red" }}>
													{this.state.errors.password}
												</p>
											)}
											<FormGroup>
												<Input
													type="text"
													name="link"
													id="link"
													value={link}
													placeholder="http://example.com"
													invalid={
														!!this.state.errors.link
													}
													onChange={this.handleChange}
												/>
											</FormGroup>
											{!!this.state.errors.link && (
												<p style={{ color: "red" }}>
													{this.state.errors.link}
												</p>
											)}

											<FormGroup inline>
												<Row>
													<Col md={4}>
														<Input
															type="text"
															value={tag0}
															name="tag0"
															placeholder="tag0"
															onChange={
																this
																	.handleTagChange
															}
														/>
													</Col>
													<Col md={4}>
														<Input
															type="text"
															value={tag1}
															name="tag1"
															placeholder="tag1"
															onChange={
																this
																	.handleTagChange
															}
														/>
													</Col>
													<Col md={4}>
														<Input
															type="text"
															value={tag2}
															name="tag2"
															placeholder="tag2"
															onChange={
																this
																	.handleTagChange
															}
														/>
													</Col>
												</Row>
											</FormGroup>

											<Button
												color="primary"
												size="md"
												block
											>
												{this.props.curdoc
													? `Update`
													: `Add`}
											</Button>
										</Form>
									</Col>
								</Row>
							</Container>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

AddNewPage.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}),
	addDoc: PropTypes.func.isRequired,
	updateDoc: PropTypes.func.isRequired,
	curdoc: PropTypes.arrayOf(
		PropTypes.shape({
			dname: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			password: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired
		}).isRequired
	)
};

export default connect(
	null,
	{ addDoc, updateDoc }
)(AddNewPage);
