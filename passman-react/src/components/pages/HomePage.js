import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";
import NavBar from "../navs/NavBar";
import { fetchDocs, deleteDoc } from "../../actions/docs";
import { allDocsSelector } from "../../reducers/docs";
import AddNewPage from "./AddNewPage";

import "./PageStyle.css";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: "",
			result: [],
			loading: false,
			doc: null,
			mode: "None",
			docdeleted: false
		};
	}

	componentDidMount = () => this.onIt(this.props);

	onIt = props => props.fetchDocs();

	// SEARCH FUNCTIONS
	onSearch = e => {
		clearTimeout(this.timer);
		this.setState({ result: [], query: e.target.value });
		this.timer = setTimeout(this.search, 1000);
	};

	search = () => {
		if (!this.state.query) return;
		this.setState({ loading: true });
		var result = [];
		this.props.docs.map(doc => {
			if (doc !== undefined && doc.dname.includes(this.state.query)) {
				result.push(doc);
			}
			return null;
		});
		this.setState({ result, loading: false });
	};

	// EDIT FUNCTION
	onEdit = e => {
		const result = this.props.docs.filter(el => el._id === e.target.value);
		this.setState({
			mode: "editmode",
			doc: result
		});
	};

	//DELETE FUNCTION
	onDelete = e => {
		const id = e.target.value;
		const result = this.props.docs.filter(el => el._id === id);
		this.props.deleteDoc(result).then(doc => {
			alert("doc successfully deleted...");
			this.props.docs.splice(this.props.docs.indexOf(id), 1);
			this.setState({ result: [], query: "" });
		});
	};

	render() {
		const { query, result } = this.state;

		return (
			<div>
				{this.state.mode === "None" && (
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
										Home Page
									</h3>
									<Container>
										<Row style={{ marginTop: "20px" }}>
											<Col
												className="searchbox"
												sm="12"
												md={{ size: 8, offset: 2 }}
											>
												<Form
													onSubmit={e =>
														this.onSubmit(e)
													}
												>
													<Input
														type="text"
														name="query"
														id="query"
														value={query}
														placeholder="Search keyword"
														onChange={this.onSearch}
													/>
												</Form>
											</Col>
										</Row>
										<Row style={{ marginTop: "20px" }}>
											<Col
												className="results"
												sm="12"
												md={{ size: 8, offset: 2 }}
											>
												<h4>Results</h4>
												{result !== undefined &&
													result !== null &&
													result.map(doc => (
														<div
															className="resultbox"
															key={doc._id}
														>
															<Container>
																<Row
																	style={{
																		float:
																			"right"
																	}}
																>
																	<Col>
																		<Button
																			color="primary"
																			size="sm"
																			className="buttonUI mr-2 mr-2"
																			onClick={
																				this
																					.onEdit
																			}
																			value={
																				doc._id
																			}
																		>
																			Edit
																		</Button>
																		<Button
																			color="danger"
																			size="sm"
																			className="buttonUI mr-2 mr-2"
																			onClick={
																				this
																					.onDelete
																			}
																			value={
																				doc._id
																			}
																		>
																			Delete
																		</Button>
																	</Col>
																</Row>
																<Row>
																	<strong>
																		{
																			doc.dname
																		}
																	</strong>
																	&nbsp;&nbsp;&nbsp;&nbsp;
																	<a
																		href={
																			doc.link
																		}
																		target="_blank"
																		rel="noopener noreferrer"
																	>
																		{
																			doc.link
																		}
																	</a>
																</Row>
																<Row>
																	<Col>
																		{
																			doc.username
																		}
																	</Col>
																	<Col>
																		{
																			doc.email
																		}
																	</Col>
																</Row>
																<Row>
																	<Col>
																		{
																			doc.password
																		}
																	</Col>
																</Row>
															</Container>
														</div>
													))}
											</Col>
										</Row>
									</Container>
								</Col>
							</Row>
						</Container>
					</div>
				)}
				{this.state.mode === "editmode" && (
					<AddNewPage curdoc={this.state.doc} />
				)}
			</div>
		);
	}
}

HomePage.propTypes = {
	fetchDocs: PropTypes.func.isRequired,
	deleteDoc: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		docs: allDocsSelector(state)
	};
}

export default connect(
	mapStateToProps,
	{ fetchDocs, deleteDoc }
)(HomePage);
