import React, { Component } from "react";
import PropTypes from "prop-types";
import {
	Container,
	Row,
	Col,
	Table,
	Modal,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
	Tooltip,
	Collapse
} from "reactstrap";
import { connect } from "react-redux";
import NavBar from "../navs/NavBar";
import { allDocsSelector } from "../../reducers/docs";
import { fetchDocs } from "../../actions/docs";
import "./PageStyle.css";

class AllPage extends Component {
	state = {
		modal: false,
		doc: {
			dname: "",
			username: "",
			email: "",
			password: "",
			tags: [],
			link: ""
		},
		result: [],
		order: "az",
		tooltipOpen: false,
		collapse: false
	};

	componentDidMount = () => this.onIt(this.props);

	onIt = props =>
		props
			.fetchDocs()
			.then(() => this.setState({ result: this.props.docs }));

	modalToggle = doc => {
		this.setState({ modal: !this.state.modal, doc });
	};

	tooltipToggle = () => {
		this.setState({ tooltipOpen: !this.state.tooltipOpen });
	};

	onFilter = () => {
		let result = this.state.result;
		if (this.state.order === "az") {
			result.sort(function(a, b) {
				if (a.dname < b.dname) return -1;
				else if (a.dname > b.dname) return 1;
				return null;
			});
			this.setState({ order: "za" });
		} else {
			result.sort(function(a, b) {
				if (a.dname < b.dname) return 1;
				else if (a.dname > b.dname) return -1;
				return null;
			});
			this.setState({ order: "az" });
		}
		this.setState({ result });
	};

	passwordToggle = () => {
		this.setState({ collapse: !this.state.collapse });
	};

	render() {
		let sno = 1;
		const { doc, result } = this.state;
		let id = 0;

		return (
			<div className="Container">
				<NavBar />
				<h4 style={{ textAlign: "center", marginTop: "50px" }}>
					All Documents
				</h4>
				<Container style={{ marginTop: "50px" }}>
					<Row>
						<Col sm="12">
							<Table
								striped
								responsive
								dark
								size="sm"
								bordered
								hover
							>
								<thead>
									<tr>
										<th>S.No</th>
										<th>
											Name
											<a
												role="button"
												style={{ float: "right" }}
												onClick={this.onFilter}
												id="filterButton"
											>
												#
											</a>
										</th>
										<th>Username</th>
										<th>Email</th>
										<th>Password</th>
										<th>Link</th>
										<th>Tags</th>
									</tr>
								</thead>
								<tbody>
									{result && result.length === 0 ? (
										<tr>
											<th scope="row">-</th>
											<td>----</td>
											<td>----</td>
											<td>----</td>
											<td>----</td>
											<td>----</td>
											<td>----</td>
										</tr>
									) : (
										result.map(doc => (
											<tr
												key={sno}
												onClick={() =>
													this.modalToggle(doc)
												}
											>
												<th scope="row">{sno++}</th>
												<td>{doc.dname}</td>
												<td>{doc.username}</td>
												<td>{doc.email}</td>
												<td>########</td>
												<td>{doc.link}</td>
												<td>
													{doc.tags.map(t => t + " ")}
												</td>
											</tr>
										))
									)}
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
					<ModalHeader
						style={{ backgroundColor: "#343A40", color: "#ffffff" }}
					>
						<strong>{doc.dname}</strong>
					</ModalHeader>
					<ModalBody>
						<Row>
							<Col>
								<a
									href={doc.link}
									target="_blank"
									rel="noopener noreferrer"
									style={{
										margin: "15px"
									}}
								>
									{doc.link}
								</a>
							</Col>
						</Row>
						<Row>
							<Col>{doc.username}</Col>
							<Col>{doc.email}</Col>
						</Row>
						<Row>
							<Col>
								<a role="button" onClick={this.passwordToggle}>
									<u>view password</u>
								</a>
								<Collapse isOpen={this.state.collapse}>
									<font color="red">{doc.password}</font>
								</Collapse>
							</Col>
							<Col>
								{doc.tags.map(t => (
									<i key={id++}>
										&nbsp;
										<font color="green">{t}</font>
										&nbsp;
									</i>
								))}
							</Col>
						</Row>
					</ModalBody>
					<ModalFooter>
						<Button
							color="secondary"
							onClick={() =>
								this.modalToggle({
									dname: "",
									username: "",
									email: "",
									password: "",
									tags: [],
									link: ""
								})
							}
							size="sm"
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<Tooltip
					placement="auto"
					isOpen={this.state.tooltipOpen}
					target="filterButton"
					toggle={this.tooltipToggle}
				>
					Filter ascending or descending
				</Tooltip>
			</div>
		);
	}
}

AllPage.propTypes = {
	docs: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			dname: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
			email: PropTypes.string.isRequired,
			password: PropTypes.string.isRequired,
			link: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	fetchDocs: PropTypes.func.isRequired,
	striped: PropTypes.bool,
	bordered: PropTypes.bool,
	dark: PropTypes.bool,
	responsive: PropTypes.bool,
	size: PropTypes.string,
	hover: PropTypes.bool,
	placement: PropTypes.oneOf(["auto", "top"]),
	isOpen: PropTypes.bool,
	target: PropTypes.oneOf([PropTypes.string, PropTypes.func]),
	tooltipToggle: PropTypes.func,
	toggle: PropTypes.func
};

function mapStateToProps(state) {
	return {
		docs: allDocsSelector(state)
	};
}

export default connect(
	mapStateToProps,
	{ fetchDocs }
)(AllPage);
