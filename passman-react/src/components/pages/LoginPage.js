import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import NavBar from "../navs/NavBar";
import {
	Container,
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Alert,
	Button
} from "reactstrap";
import { login } from "../../actions/auth";
import "./PageStyle.css";

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {
				username: "",
				password: ""
			},
			errors: {},
			visibleAlert: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = async event => {
		const { name, value } = event.target;
		await this.setState({
			data: { ...this.state.data, [name]: value }
		});
	};

	validateFields(data) {
		const errors = {};
		if (!data.username) errors.username = "Username needed!";
		if (!data.password) errors.password = "Can't be blank!";
		return errors;
	}

	submitform(e) {
		e.preventDefault();
		const errors = this.validateFields(this.state.data);
		this.setState({
			errors
		});
		if (Object.keys(errors).length === 0) {
			// alert(`Username: ${this.state.data.username}, Password: ${this.state.data.password}`);
			this.props
				.login(this.state.data)
				.then(() => this.props.history.push("/home"))
				.catch(err => {
					this.setState({
						errors: err.response.data.errors,
						visibleAlert: true
					});
				});
		}
		if (this.state.errors.username) {
			this.setState({
				data: {
					username: ""
				}
			});
		}
		if (this.state.errors.password) {
			this.setState({
				data: {
					username: "",
					password: ""
				}
			});
		}
	}

	onDismissAlert = () => {
		this.setState({
			visibleAlert: false
		});
	};

	render() {
		const { username, password } = this.state.data;

		return (
			<div className="Container">
				<NavBar />
				<Container>
					<Row>
						<Col
							className="login-form"
							sm="12"
							md={{ size: 6, offset: 3 }}
						>
							{this.state.errors.global &&
								this.state.visibleAlert === true && (
									<Alert
										color="danger"
										isOpen={this.state.visibleAlert}
										toggle={this.onDismissAlert}
									>
										{this.state.errors.global}
									</Alert>
								)}
							<Form onSubmit={e => this.submitform(e)}>
								<h3>Login</h3>
								<FormGroup>
									<Label for="username">Username</Label>
									<Input
										type="text"
										name="username"
										id="username"
										value={username}
										placeholder="Enter Username"
										invalid={!!this.state.errors.username}
										onChange={this.handleChange}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="password">Password</Label>
									<Input
										type="password"
										name="password"
										id="password"
										value={password}
										placeholder="********"
										invalid={!!this.state.errors.password}
										onChange={this.handleChange}
									/>
								</FormGroup>
								<Button>Submit</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

LoginPage.propTypes = {
	login: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

export default connect(
	null,
	{ login }
)(LoginPage);
