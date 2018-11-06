import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import {
	Container,
	Row,
	Col,
	Form,
	Input,
	Button,
	Modal,
	ModalBody
} from "reactstrap";
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
			docdeleted: false,
			uniTags: [],
			filter: "all",
			pwdModal: false,
			pwd: ""
		};
	}

	componentDidMount = () => {
		this.onIt(this.props);
		this.onItTags();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.result !== this.state.result) {
			if (!this.state.query && this.state.filter === "all") {
				this.setState({ result: this.props.docs });
			}
		}
		if (prevState.filter !== this.state.filter) {
			this.search();
		}
	};

	onIt = props =>
		props
			.fetchDocs()
			.then(() => this.setState({ result: this.props.docs }));

	onItTags = () =>
		axios
			.post("/api/docs/unique_tags")
			.then(res => this.setState({ uniTags: res.data.tags }));

	// SEARCH FUNCTIONS
	onSearch = e => {
		clearTimeout(this.timer);
		this.setState({ result: [], query: e.target.value });
		this.timer = setTimeout(this.search, 1000);
	};

	search = () => {
		//if (!this.state.query) return;
		this.setState({ loading: true });
		var result = [];
		this.props.docs.map(doc => {
			if (this.state.filter === "all") {
				if (doc !== undefined && doc.dname.includes(this.state.query)) {
					result.push(doc);
				}
			} else {
				if (this.state.query) {
					if (
						doc !== undefined &&
						doc.dname.includes(this.state.query) &&
						doc.tags.includes(this.state.filter)
					) {
						result.push(doc);
					}
				} else {
					if (
						doc !== undefined &&
						doc.tags.includes(this.state.filter)
					) {
						result.push(doc);
					}
				}
			}
			return null;
		});
		this.setState({ result, loading: false });
	};

	// EDIT FUNCTION
	onEdit = e => {
		const result = this.state.result.filter(
			el => el._id === e.target.value
		);
		this.setState({
			mode: "editmode",
			doc: result
		});
	};

	//DELETE FUNCTION
	onDelete = e => {
		const id = e.target.value;
		const result = this.state.result.filter(el => el._id === id);
		this.props.deleteDoc(result).then(doc => {
			alert("doc successfully deleted...");
			this.state.result.splice(this.state.result.indexOf(id), 1);
			this.onItTags();
			this.setState({ result: [], query: "", filter: "all" });
		});
	};

	//Applying Filer
	applyFiler = e => {
		const filter = e.target.value;
		this.setState({ filter });
	};

	pwdToggle = pwd => {
		this.setState({ pwdModal: !this.state.pwdModal, pwd });
	};

	render() {
		const { query, result, uniTags } = this.state;
		let id = 0;

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
										<Row style={{ marginTop: "5px" }}>
											<Col
												sm="12"
												md={{ size: 8, offset: 2 }}
											>
												<div style={{ float: "left" }}>
													<strong>
														Current
														Filter:&nbsp;&nbsp;&nbsp;
													</strong>
													<font color="green">
														{this.state.filter}
													</font>
												</div>
												<div style={{ float: "right" }}>
													<strong>
														Filter:&nbsp;&nbsp;&nbsp;
													</strong>
													<Button
														color="primary"
														size="sm"
														style={{
															marginRight: "10px"
														}}
														value="all"
														onClick={
															this.applyFiler
														}
													>
														Show All
													</Button>
													{uniTags.map(t => (
														<Button
															color="secondary"
															key={t}
															size="sm"
															style={{
																marginRight:
																	"10px"
															}}
															value={t}
															onClick={
																this.applyFiler
															}
														>
															{t}
														</Button>
													))}
												</div>
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
																		<a
																			role="button"
																			onClick={() =>
																				this.pwdToggle(
																					doc.password
																				)
																			}
																		>
																			<u>
																				########
																			</u>
																		</a>
																		<Modal
																			isOpen={
																				this
																					.state
																					.pwdModal
																			}
																			toggle={() =>
																				this.pwdToggle(
																					""
																				)
																			}
																		>
																			<ModalBody
																			>
																				<font color="green">
																					{
																						this
																							.state
																							.pwd
																					}
																				</font>
																			</ModalBody>
																		</Modal>
																	</Col>
																	<Col>
																		{doc.tags.map(
																			t => (
																				<i
																					key={
																						id++
																					}
																				>
																					&nbsp;
																					<font color="green">
																						{
																							t
																						}
																					</font>
																					&nbsp;
																				</i>
																			)
																		)}
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
