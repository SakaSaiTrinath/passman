import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Table } from "reactstrap";
import { connect } from "react-redux";
import NavBar from "../navs/NavBar";
import { allDocsSelector } from "../../reducers/docs";
import { fetchDocs } from "../../actions/docs";
import "./PageStyle.css";

class AllPage extends Component {
	componentDidMount = () => this.onIt(this.props);

	onIt = props => props.fetchDocs();

	render() {
		let sno = 1;
		const { docs } = this.props;

		return (
			<div className="Container">
				<NavBar />
				<h4 style={{ textAlign: "center", marginTop: "50px" }}>
					All Documents
				</h4>
				<Container style={{ marginTop: "50px" }}>
					<Row>
						<Col sm="12" md={{ size: "auto", offset: 2 }}>
							<Table striped responsive dark>
								<thead>
									<tr>
										<th>S.No</th>
										<th>Name</th>
										<th>Username</th>
										<th>Email</th>
										<th>Password</th>
										<th>Link</th>
										<th>Tags</th>
									</tr>
								</thead>
								<tbody>
									{docs && docs.length === 0 ? (
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
										docs.map(doc => (
											<tr key={sno}>
												<th scope="row">{sno++}</th>
												<td>{doc.dname}</td>
												<td>{doc.username}</td>
												<td>{doc.email}</td>
												<td>{doc.password}</td>
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
	fetchDocs: PropTypes.func.isRequired
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
